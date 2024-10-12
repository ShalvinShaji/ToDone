import React, { useState } from "react";
import Modal from "./Modal";
import adIcon from "../../public/assets/addSvg.svg";

const Newtask = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="new_task_btn flex justify-center items-center">
      <button
        className=" flex items-center justify-around fixed bottom-12 bg-gray-500 text-white hover:bg-green-500 transition duration-200 p-3 rounded-lg"
        onClick={openModal}
      >
        Add a new task <img src={adIcon} alt="add todo" className="ms-3 w-[20px] height-[auto]" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Newtask;
