import React from 'react';
import { RiCloseCircleLine } from "react-icons/ri";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 dark:bg-slate-600 dark:bg-opacity-40">
      <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={onClose}
        >
          <RiCloseCircleLine className="text-4xl text-white" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
