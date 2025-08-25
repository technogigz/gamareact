import React from 'react';

const ApiEntryLayout = ({
  config,
  digit,
  setDigit,
  points,
  setPoints,
  selectedGameType,
  setSelectedGameType,
  onApiEntryAdd, // The new handler from BidGames.jsx
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

    <div className="input-row">
      <label>{config.fields[0].label}</label>
      <input
        type="tel"
        maxLength={config.fields[0].maxLength}
        value={digit}
        onChange={(e) => setDigit(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder={config.fields[0].placeholder}
        disabled={isLoading}
      />
    </div>

    <div className="input-row">
      <label>{config.fields[1].label}</label>
      <input
        type="tel"
        value={points}
        onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder={config.fields[1].placeholder}
        disabled={isLoading}
      />
    </div>

    <button className="btn-add-bid" onClick={onApiEntryAdd} disabled={isLoading}>
      {isLoading ? 'Fetching...' : 'ADD BID'}
    </button>
  </>
);

export default ApiEntryLayout;