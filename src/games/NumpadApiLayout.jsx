import React from 'react';
import Numpad from './Numpad';

const NumpadApiLayout = ({
  points,
  setPoints,
  selectedGameType,
  setSelectedGameType,
  handleNumpadApiClick,
  fetchedDigits,
  isLoading,
  showSessionSelector,
  openBidDisabled,
}) => (
  <>
  {showSessionSelector &&(
    <div className="input-row">
      <label>Select Game Type:</label>
      <div className="toggle-buttons">
         {!openBidDisabled && (
            <button
              className={selectedGameType === 'Open' ? 'active' : ''}
              onClick={() => setSelectedGameType('Open')}
              disabled={isLoading}
            >
              Open
            </button>
          )}
          
        <button
          className={selectedGameType === 'Close' ? 'active' : ''}
          onClick={() => setSelectedGameType('Close')}
          disabled={isLoading}
        >
          Close
        </button>
      </div>
    </div>)}
    <div className="input-row">
      <label>Enter Points:</label>
      <input
        type="tel"
        value={points}
        onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="Enter Amount"
        disabled={isLoading}
      />
    </div>
    <Numpad
      onNumberClick={handleNumpadApiClick}
     // fetchedDigits={fetchedDigits}
      isLoading={isLoading}
    />
  </>
);

export default NumpadApiLayout;