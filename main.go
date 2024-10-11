package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

var collection *mongo.Collection

func main() {

	fmt.Println("App started..")

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error Loading .env file", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {

		log.Fatal(err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to Mongo db")

	collection = client.Database("todone_db").Collection("todos")

	app := gin.Default()
	app.GET("/api/todos", getTodo)
	app.POST("/api/todos", createTodo)
	app.PATCH("/api/todos/:id", updateTodo)
	app.DELETE("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Fatal(app.Run("0.0.0.0:" + port))

}

func getTodo(c *gin.Context) {
	var todos []Todo
	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		c.JSON(500, gin.H{"Error": err.Error()})
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			c.JSON(500, gin.H{"Error": err.Error()})
		}

		todos = append(todos, todo)
	}
	c.JSON(200, todos)
}

func createTodo(c *gin.Context) {
	todo := new(Todo)
	if err := c.ShouldBindJSON(todo); err != nil {
		c.JSON(500, gin.H{"Error": err.Error()})
	}
	if todo.Body == "" {
		c.JSON(400, gin.H{"error": "Todo body cannot be empty "})
	}
	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		c.JSON(500, gin.H{"Error": err.Error()})
	}
	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	c.JSON(201, todo)

}

func updateTodo(c *gin.Context) {
	id := c.Param("id")

	// Create a filter to find the todo by its ID
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	filter := bson.M{"_id": objectId}
	update := bson.M{"$set": bson.M{"completed": true}}
	// Update the todo body in the database
	_ , err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to update todo"})
		return
	}
	c.JSON(200, gin.H{"success": true})
}

func deleteTodo(c *gin.Context){
	id := c.Param("id")
	// Create a filter to find the todo by its ID
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}
	filter := bson.M{"_id": objectId}
	// Delete the todo from the database
	_ , err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete todo"})
		return
	}
	c.JSON(200, gin.H{"success": true})
}
