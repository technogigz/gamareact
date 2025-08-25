import React from 'react';
// We will create this CSS class in the last step
import './AutoCompleteInput.css'; 

const AutocompleteInput = ({
  value,
  onChange,
  placeholder,
  maxLength,
  suggestions,
  onSuggestionClick,
}) => {
  return (
    <div className="autocomplete-wrapper">
      <input
        type="tel"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off" // Prevent browser's default autocomplete
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            // Use onMouseDown to register click before the input blurs and hides the list
            <li key={s} onMouseDown={() => onSuggestionClick(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;