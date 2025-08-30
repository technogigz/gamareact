import React from 'react';
import AutocompleteInput from './AutoCompleteInput'; // Ensure this is imported
import DateChip from '../components/DateChip';
const StandardLayout = ({
  config,
  gameType,
  digit,
  handleDigitChange,
  points,
  setPoints,
  handleAddBid,
  showSessionSelector,
  selectedGameType,
  setSelectedGameType,
  suggestions,
  handleSuggestionClick,
  openBidDisabled,
}) => {
  // A list of game types that should use the special autocomplete input
  const gamesWithAutocomplete = ['singlePana','jodi','doublePana','singleDigits','triplePana'];

  return (
    <>
      <DateChip/>
      {showSessionSelector && (
        <div className="input-row">
          <label>Select Game Type:</label>
         <select value={selectedGameType} onChange={(e) => setSelectedGameType(e.target.value)}>
  {/* The "Open" option will now only show up if bids are NOT disabled */}
  {!openBidDisabled && <option value="Open">Open</option>}
  <option value="Close">Close</option>
</select>
        </div>
      )}
   
      <div className="input-row">
        <label>{config.fields[0].label}</label>

        {/* UPDATED: This now checks if the current gameType is in our list */}
        {gamesWithAutocomplete.includes(gameType) ? (
          <AutocompleteInput
            value={digit}
            onChange={handleDigitChange}
            placeholder={config.fields[0].placeholder}
            maxLength={config.fields[0].maxLength}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        ) : (
          // Render a normal input for all other 'Standard' games
          <input
            type="tel"
            maxLength={config.fields[0].maxLength}
            value={digit}
            onChange={(e) => handleDigitChange(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder={config.fields[0].placeholder}
          />
        )}
      </div>

      <div className="input-row">
        <label>{config.fields[1].label}</label>
        <input
          type="tel"
          value={points}
          onChange={(e) => setPoints(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={config.fields[1].placeholder}
        />
      </div>

      <button className="btn-add-bid" onClick={handleAddBid}>+ ADD BID</button>
    </>
  );
};

export default StandardLayout;