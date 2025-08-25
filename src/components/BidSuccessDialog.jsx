import React from 'react';

const BidSuccessDialog = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="result-modal-content">
      <div className="result-icon-wrapper success">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h2>Bid Placed Successfully!</h2>
      <p>Your bid has been submitted.</p>
      <button className="result-btn success" onClick={onClose}>OK</button>
    </div>
  </div>
);

export default BidSuccessDialog;