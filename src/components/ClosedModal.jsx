



// src/components/ClosedModal.jsx
import "./ClosedModal.css";

export default function ClosedModal({ game, onClose }) {
  if (!game) return null;

  // The 'game' object passed from MainHome contains all the necessary data
  // like game.gameName, game.openTime, and game.closeTime.

  return (
    <div className="closed-modal-overlay">
      <div className="closed-modal">
        <div className="icon-box">
          <div className="big-cross">✕</div>
        </div>

        <p className="closed-text">Bidding Is Closed For Today</p>
        {/* Use the dynamic game name */}
        <h3>{game.gameName}</h3>

        <div className="timing">
          {/* The API provides openTime and closeTime. 
            We can map these to the different labels in the modal.
            You can adjust these if your API provides more specific times.
          */}
          <div><span>Open Result Time :</span> <span>{game.openTime || "--:--"}</span></div>
          <div><span>Open Bid Last Time :</span> <span>{game.openTime || "--:--"}</span></div>
          <div><span>Close Result Time :</span> <span>{game.closeTime || "--:--"}</span></div>
          <div><span>Close Bid Last Time :</span> <span>{game.closeTime || "--:--"}</span></div>
        </div>

        <button className="ok-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
