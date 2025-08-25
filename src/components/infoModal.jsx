import React from 'react';
import './infoModal.css'; // We will create this CSS file next

const InfoModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose} className="modal-ok-button">
          Ok
        </button>
      </div>
    </div>
  );
};

export default InfoModal;