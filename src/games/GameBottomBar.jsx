import React from 'react';

const BottomBar = ({ totalBids, totalPoints, onSubmit }) => (
  <footer className="bottom-bar">
    <div className="summary-item">
      <span>Bids</span>
      <strong>{totalBids}</strong>
    </div>
    <div className="summary-item">
      <span>Points</span>
      <strong>{totalPoints}</strong>
    </div>
    <button 
      className="btn-submit" 
      onClick={onSubmit}
      disabled={totalBids === 0} // Disable button if no bids
    >
      SUBMIT
    </button>
  </footer>
);

export default BottomBar;