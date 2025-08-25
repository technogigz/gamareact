import React from 'react';

const ManualGeneratorLayout = ({
  points,
  setPoints,
  pannaType,
  setPannaType,
  selectedGameType,
  setSelectedGameType,
  manualDigits,
  setManualDigits,
  onAddBid,
  isLoading,
  showSessionSelector,
   openBidDisabled,
}) => {

  const handlePannaTypeChange = (type) => {
    setPannaType(type);
  };

  const handleDigitChange = (e, digitKey) => {
    const { value } = e.target;
    // Allow only a single digit (0-9) or an empty string
    if (/^[0-9]?$/.test(value)) {
      setManualDigits(prev => ({ ...prev, [digitKey]: value }));
    }
  };

  return (
    <>
    {showSessionSelector&&(
      <div className="input-row">
        <label>Select Game Type</label>
        <select value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)} disabled={isLoading}>
            
            {/* <<<< 2. OPTION IS CONDITIONALLY RENDERED >>>> */}
            {!openBidDisabled && <option value="Open">Open</option>}

            <option value="Close">Close</option>
          </select>
      </div>)}

      <div className="panna-type-selector">
        <div className="checkbox-group">
          <input type="checkbox" id="sp" checked={pannaType === 'SP'} onChange={() => handlePannaTypeChange('SP')} disabled={isLoading} />
          <label htmlFor="sp">SP</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="dp" checked={pannaType === 'DP'} onChange={() => handlePannaTypeChange('DP')} disabled={isLoading} />
          <label htmlFor="dp">DP</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="tp" checked={pannaType === 'TP'} onChange={() => handlePannaTypeChange('TP')} disabled={isLoading} />
          <label htmlFor="tp">TP</label>
        </div>
      </div>

      <div className="manual-digits-row">
        <input type="tel" value={manualDigits.digit1} onChange={(e) => handleDigitChange(e, 'digit1')} placeholder="Left Digit" maxLength="1" disabled={isLoading} />
        <input type="tel" value={manualDigits.digit2} onChange={(e) => handleDigitChange(e, 'digit2')} placeholder="Center Digit" maxLength="1" disabled={isLoading} />
        <input type="tel" value={manualDigits.digit3} onChange={(e) => handleDigitChange(e, 'digit3')} placeholder="Right Digit" maxLength="1" disabled={isLoading} />
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
      
      <button className="btn-add-bid" onClick={onAddBid} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'ADD'}
      </button>
    </>
  );
};

export default ManualGeneratorLayout;