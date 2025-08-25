import React from 'react';
import { TrashIcon } from './GameIcons';

const BidsList = ({ bids, onRemove , gameType}) => {
  if (bids.length === 0) return <div className="no-bids-message">No Bids Placed Yet</div>;;

  return (
    <div className="bids-list-container">
      <div className="bids-header">
        <div className="col">Digit</div>
        <div className="col">Amount</div>
        <div className="col">Game Type</div>
        <div className="col-action"></div>
      </div>
      <hr className="divider" />
      {bids.map((bid, index) => {
               const isSangam = gameType?.toLowerCase().includes('sangam');
        let displayDigit, displayType;

        if (isSangam) {
          // For Half Sangam A (openDigit, closePana)
          // For Half Sangam B (openPana, closeAnk)
          // We consistently store the 3-digit number as 'pana' and 1-digit as 'digit'
          displayDigit = `${bid.pana} - ${bid.digit}`;
          displayType = '-';
        } else {
          displayDigit = bid.digit;
          displayType = bid.type;
        }
        return(
        <div key={index} className="bid-row-card">
            <div className="col">{displayDigit}</div>
            <div className="col">{bid.points}</div>
            <div className="col">{displayType}</div>
            <div className="col-action" onClick={() => onRemove(index)}>
              <TrashIcon />
            </div>
          </div>
      )})}
    </div>
  );
};

export default BidsList;