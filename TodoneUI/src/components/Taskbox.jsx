import React from "react";
import "./Taskbox.css";
import { useQuery } from "@tanstack/react-query";

// Define the type for your todo data if using TypeScript
// export type Todo = {
//   id: number;
//   body: string;
//   completed: boolean;
// };

const Taskbox = () => {
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/todos");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log(data);
      return data;
    },
  });

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }),
      });

      if (!response.ok) {
        throw new Error(`Error updating task ${id}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating task ${id}: ${error.message}`);
      console.log(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting task ${id}: ${response.statusText}`);
      }

      console.log(`Task ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting task ${id}: ${error.message}`);
      console.log(`Failed task id: ${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">Loading tasks...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        Error fetching tasks: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:items-center justify-center p-2">
      {tasks.map((task, idx) => (
        <div
          key={idx}
          className="task_box lg:w-1/2 flex flex-col lg:flex-row justify-between items-start lg:items-center mt-5"
        >
          {/* Task Body */}
          <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div className="bg-slate-600 p-3 rounded-lg flex justify-between items-center">
              <p
                className={`${
                  task.completed ? "line-through italic text-green-400" : ""
                }`}
              >
                {task.body}
              </p>
              <div>
                {task.completed ? (
                  <span className="text-green-400 font-semibold"> - Done</span>
                ) : (
                  <span className="text-yellow-400 font-semibold">
                    - In progress
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex items-center justify-between mt-3 lg:mt-0">
            <button
              className={`btn me-5 lg:me-0 lg:ms-5 ${
                task.completed ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => handleComplete(task._id)}
            >
              {task.completed ? "Task completed" : "Mark as completed"}
            </button>
            <button
              className="btn lg:ms-3"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taskbox;
