import React from "react";
import "./Modal.css"; // Keep this for any additional custom styles

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className=" flex items-center justify-center flex-col modal-content p-5 rounded-lg shadow-lg bg-slate-500 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-[500px] mx-auto">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              <h2 className="text-lg font-bold text-slate-900">Create New Task</h2>
            </span>
          </div>
          <textarea
            placeholder="Enter your task here"
            className="input input-bordered w-full  h-[100px] mt-2 p-3"
          />
        </label>
        <div className="flex items-center justify-center mt-4">
          <button className="btn me-3" onClick={onClose}>
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
