import React from 'react';
import './Modal.css'; // Create a corresponding CSS file for styling

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Don't render the modal if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;