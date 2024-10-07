package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type ToDo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {

	fmt.Println("App starting..")

	app := fiber.New()

	err := godotenv.Load(".env")
	if err!=nil{
		log.Fatal("Error Loading .env file")
	}
	PORT := os.Getenv("PORT")


	todos := []ToDo{} // main array to store the todos
	fmt.Println(todos)

	//Get ToDos
	app.Get("/api/todos/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	//Post ToDos
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &ToDo{}
		c.BodyParser(todo)

		if err := c.BodyParser(todo); err != nil {
			return err
		}
		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"Error": "TODO Body is required"}) // if todo body is null throw error
		}

		todo.ID = len(todos) + 1     // increament the todo id by 1
		todos = append(todos, *todo) // append new todo to todos list

		return c.Status(201).JSON(todo)

	})

	//Update Todos
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Body = fmt.Sprint(c.Body())
				return c.Status(200).JSON(todos[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Todo Not found"})
	})

	//Delete a todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{"success": true})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Todo cannot be deleted."})
	})

	//port
	log.Fatal(app.Listen(":" + PORT))
}
