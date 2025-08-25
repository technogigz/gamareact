import React from 'react';

const BidFailureDialog = ({ message, onClose }) => (
  <div className="modal-overlay">
    <div className="result-modal-content">
      <div className="result-icon-wrapper failure">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <h2>Bid Failed!</h2>
      <p>{message || 'An unknown error occurred.'}</p>
      <button className="result-btn failure" onClick={onClose}>OK</button>
    </div>
  </div>
);

export default BidFailureDialog;