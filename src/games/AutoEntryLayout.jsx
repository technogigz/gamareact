import React from 'react';

const AutoEntryLayout = ({
  config,
  points,
  setPoints,
  jodiDigit,
  handleAutoEntry, // This is the function that will be called on change
}) => (
  <>
    <div className="input-row">
      <label>{config.fields[0].label}</label>
      <input 
        type="tel" 
        value={points} 
        onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder={config.fields[0].placeholder} 
      />
    </div>
    <div className="input-row">
      <label>{config.fields[1].label}</label>
      <input 
        type="tel" 
        maxLength={config.fields[1].maxLength} 
        value={jodiDigit} 
        // The magic happens here: call the handler on every change
        onChange={(e) => handleAutoEntry(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder={config.fields[1].placeholder} 
      />
    </div>
  </>
);

export default AutoEntryLayout;