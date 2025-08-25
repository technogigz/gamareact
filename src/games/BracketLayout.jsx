// In src/components/BracketGeneratorLayout.jsx

import React from 'react';

const BracketGeneratorLayout = ({
  bracketType,
  setBracketType,
  points,
  setPoints,
  onGenerate, // This will be our handleBracketGenerate function
  config,
}) => {
  return (
    <>
      <div className="input-row">
        <label>Select Bracket Type:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="halfBracket"
              checked={bracketType === 'halfBracket'}
              onChange={(e) => setBracketType(e.target.value)}
            />
            Half Bracket
          </label>
          <label>
            <input
              type="radio"
              value="fullBracket"
              checked={bracketType === 'fullBracket'}
              onChange={(e) => setBracketType(e.target.value)}
            />
            Full Bracket
          </label>
        </div>
      </div>

      <div className="input-row">
        <label>{config.fields[0].label}</label>
        <input
          type="tel"
          value={points}
          onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={config.fields[0].placeholder}
        />
      </div>

      <button className="btn-add-bid" onClick={onGenerate}>ADD BID</button>
    </>
  );
};

export default BracketGeneratorLayout;