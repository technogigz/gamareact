import React from 'react';
import '../css/starlineclosedmodal.css'; // We'll create this CSS file next

const StarlineClosedModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="sl-modal-overlay">
      <div className="sl-modal-content">
        <div className="sl-modal-icon-wrapper">
          <span className="sl-modal-icon">✕</span>
        </div>
        <p className="sl-modal-title">Bidding Is Closed For Today</p>
        <h3 className="sl-modal-gamename">{game.gameName}</h3>
        
        <div className="sl-modal-timing">
          <div>
            <span>Open Result Time :</span>
            <span>{game.openTime || "--:--"}</span>
          </div>
          <div>
            <span>Open Bid Last Time :</span>
            <span>{game.closeTime || "--:--"}</span>
          </div>
        </div>

        <button className="sl-modal-ok-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default StarlineClosedModal;