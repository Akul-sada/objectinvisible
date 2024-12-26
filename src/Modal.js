import React from 'react';
import './Modal.css'; // Create a corresponding CSS file for styling

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // Don't render the modal if not open

  // Prevent click events from propagating through the overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;