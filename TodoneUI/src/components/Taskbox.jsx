import React from "react";
import "./Taskbox.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import doneIcon from "../../public/assets/doneIcon.svg";
import binIcon from "../../public/assets/binIcon.svg";

const Taskbox = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/todos");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data || []; // Return empty array if data is null/undefined
    },
  });

  // Mutation for deleting a task
  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:4000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error deleting task ${id}: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the todos query to get the updated list
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Mutation for completing a task
  const completeTaskMutation = useMutation({
    mutationFn: async (id) => {
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
    },
    onSuccess: () => {
      // Invalidate and refetch the todos query to get the updated list
      queryClient.invalidateQueries(["todos"]);
    },
  });

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

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>No pending tasks</p>
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
            <div className="bg-slate-900 text-white p-3 rounded-lg flex justify-between items-center shadow">
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
              className={`btn me-5 lg:me-0 lg:ms-5 w-[180px] ${
                task.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-500 text-white hover:bg-green-500 transition duration-200 p-2 rounded-lg"
              }`}
              onClick={() => completeTaskMutation.mutate(task._id)}
            >
              {task.completed ? "Task completed" : "Mark as completed"}
              <img
                src={doneIcon}
                alt="add todo"
                className="ms-1 w-[20px] height-[auto]"
              />
            </button>
            <button
              className="btn lg:ms-3 bg-gray-500 text-white hover:bg-red-500 transition duration-200 p-2 rounded-lg"
              onClick={() => deleteTaskMutation.mutate(task._id)}
            >
              Delete{" "}
              <img
                src={binIcon}
                alt="add todo"
                className="ms-1 w-[20px] height-[auto]"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Taskbox;
