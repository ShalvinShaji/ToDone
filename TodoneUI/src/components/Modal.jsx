import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  const [taskText, setTaskText] = useState("");

  const handleSave = () => {
    console.log("Task:", taskText);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="flex items-center justify-center flex-col modal-content p-5 rounded-lg shadow-lg bg-slate-500 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-[500px] mx-auto">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              <h2 className="text-lg font-bold text-slate-900">
                Create New Task
              </h2>
            </span>
          </div>
          <textarea
            placeholder="Enter your task here"
            className="input input-bordered w-full h-[100px] mt-2 p-3"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </label>
        <div className="flex items-center justify-center mt-4">
          <button className="btn me-3" onClick={handleSave}>
            Save
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
