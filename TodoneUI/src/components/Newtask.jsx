import React, { useState } from "react";
import Modal from "./Modal";

const Newtask = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="new_task_btn flex justify-center items-center">
      <button
        className="fixed bottom-12 bg-gray-500 text-white hover:bg-green-500 transition duration-200 p-3 rounded-lg"
        onClick={openModal}
      >
        Add a new task
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Newtask;
