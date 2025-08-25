import React from 'react';

const GeneratorLayout = ({
  digit,
  setDigit,
  points,
  setPoints,
  pannaType,
  setPannaType,
  selectedGameType,
  setSelectedGameType,
  onGenerateBids,
  showSessionSelector,
  isLoading,
   openBidDisabled, 
}) => {

  const handlePannaTypeChange = (type) => {
    // This makes the checkboxes behave like radio buttons
    setPannaType(type);
  };

  return (
    <>
    {showSessionSelector&&(
      <div className="input-row">
        <label>Select Game Type:</label>
         <select value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)}>
            
            {/* <<<< 2. OPTION IS CONDITIONALLY RENDERED >>>> */}
            {!openBidDisabled && <option value="Open">Open</option>}

            <option value="Close">Close</option>
          </select>
      </div>)}
       <div className='input-row'>
        <label>Enter Digit:</label>
        <input 
          type="tel" 
          maxLength="1"
          value={digit} 
          onChange={(e) => setDigit(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="Enter Digit (0-9)"
          disabled={isLoading}
        />
        </div>

      <div className="panna-type-selector">
        <div className="checkbox-group">
          <input type="checkbox" id="sp" checked={pannaType === 'SP'} onChange={() => handlePannaTypeChange('SP')} />
          <label htmlFor="sp">SP</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="dp" checked={pannaType === 'DP'} onChange={() => handlePannaTypeChange('DP')} />
          <label htmlFor="dp">DP</label>
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="tp" checked={pannaType === 'TP'} onChange={() => handlePannaTypeChange('TP')} />
          <label htmlFor="tp">TP</label>
        </div>
      </div>

      <div className="input-row">
        <label>Enter Points:</label>
        <input 
          type="tel" 
          value={points} 
          onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="Enter Amount"
        />
      </div>
      
      <button className="btn-add-bid" onClick={onGenerateBids} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'ADD'}
      </button>
    </>
  );
};

export default GeneratorLayout;