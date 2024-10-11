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
	app.GET("/api/todos", getTodos)
	app.POST("/api/todos", createTodos)
	// app.PATCH("/api/todos/:id", updateTodos)
	// app.DELETE("/api/todos/:id", deleteTodos)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}
	log.Fatal(app.Run("0.0.0.0:" + port))

}

func getTodos(c *gin.Context) {
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

func createTodos(c *gin.Context) {
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

// func updateTodos(c *gin.Context) error{

// }
// func deleteTodos(c *gin.Context) error{

// }
