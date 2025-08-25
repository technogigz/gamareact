import React from 'react';

const GroupSelectLayout = ({
  points,
  setPoints,
  oddEvenType,
  setOddEvenType,
  selectedGameType,
  setSelectedGameType,
  onAddGroupBids,
  isLoading,
  showSessionSelector,
  openBidDisabled,
}) => (
  <>
  {showSessionSelector&&(
    <div className="input-row">
      <label>Select Game Type:</label>
      <select value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)} disabled={isLoading}>
          
          {/* <<<< 2. OPTION IS CONDITIONALLY RENDERED >>>> */}
          {!openBidDisabled && <option value="Open">Open</option>}

          <option value="Close">Close</option>
        </select>
    </div>)}

    <div className="radio-group-selector">
      <label className="radio-label">
        <input 
          type="radio" 
          value="Odd" 
          name="oddEven"
          checked={oddEvenType === 'Odd'} 
          onChange={(e) => setOddEvenType(e.target.value)} 
          disabled={isLoading}
        />
        Odd
      </label>
      <label className="radio-label">
        <input 
          type="radio" 
          value="Even" 
          name="oddEven"
          checked={oddEvenType === 'Even'} 
          onChange={(e) => setOddEvenType(e.target.value)}
          disabled={isLoading}
        />
        Even
      </label>
    </div>

    <div className="input-row">
      <label>Enter Points:</label>
      <input 
        type="tel" 
        value={points} 
        onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="Amount"
        disabled={isLoading}
      />
    </div>
    
    <button className="btn-add-bid" onClick={onAddGroupBids} disabled={isLoading}>
      {isLoading ? 'Adding...' : 'ADD'}
    </button>
  </>
);

export default GroupSelectLayout;