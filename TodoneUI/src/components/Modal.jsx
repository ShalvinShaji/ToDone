import React, { useState } from "react";
import "./Modal.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Modal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [taskText, setTaskText] = useState("");

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const response = await fetch("http://localhost:4000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Error adding task: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      onClose(); // Close the modal after the task is added
      setTaskText(""); // Reset task text after adding
    },
  });

  // Function to handle adding a task
  const handleAddTask = () => {
    if (!taskText.trim()) return; // Prevent adding empty tasks

    const newTask = {
      body: taskText,
    };

    addTaskMutation.mutate(newTask);
  };

  // Function to handle keydown event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="flex items-center justify-center flex-col modal-content p-5 rounded-lg shadow-lg bg-slate-800  max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-[500px] mx-auto">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              <h2 className="text-lg font-bold text-white">Create New Task</h2>
            </span>
          </div>
          <textarea
            placeholder="Enter your task here"
            className="input input-bordered w-full h-[100px] mt-2 p-3 text-white border-0"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <div className="flex items-center justify-center mt-4">
          <button
            className="btn border-0 me-3 bg-gray-500 hover:bg-green-500 text-white"
            onClick={handleAddTask}
          >
            Save
          </button>
          <button
            className="btn bg-gray-500 text-white border-0"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
