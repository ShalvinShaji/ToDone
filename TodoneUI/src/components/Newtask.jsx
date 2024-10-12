import React, { useState } from "react";
import Modal from "./Modal";

const Newtask = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  

  return (
    <div className="new_task_btn flex justify-center items-center">
      <button
        className="fixed bottom-12 bg-slate-900 text-white p-3 rounded"
        onClick={openModal}
      >
        Add a new task to your list..
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Newtask;
