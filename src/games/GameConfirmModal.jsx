import React from 'react';

const ConfirmationModal = ({
  isOpen, onClose, onConfirm, gameName, bids, totalBids, totalPoints, walletBalance
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          {gameName}--{formattedDate}
        </header>
        <div className="modal-body">
          <div className="modal-bids-table">
            <div className="modal-bids-header">
              <div>Digits</div>
              <div>Points</div>
              <div>Type</div>
            </div>
            {bids.map((bid, index) => {
                const isSangam = bid.type?.toLowerCase().includes('sangam');
              const modalDigit = isSangam ? bid.pana : bid.digit;
              const modalType = isSangam ? '' : bid.type;
            return(
              <div key={index} className="modal-bids-row">
                <div>{modalDigit}</div>
                  <div>{bid.points}</div>
                  <div>{modalType}</div>
              </div>
            )})}
          </div>
          <div className="modal-summary">
            <div><span>Total Bids</span><span>{totalBids}</span></div>
            <div><span>Total Bids Amount</span><span>{totalPoints}</span></div>
            <div><span>Wallet Balance Before</span><span>{walletBalance}</span></div>
            <div><span>Wallet Balance After</span><span>{walletBalance - totalPoints}</span></div>
          </div>
          <p className="modal-note">Note: Bid Once Played Can Not Be Cancelled</p>
        </div>
        <footer className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={onConfirm}>Submit</button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;