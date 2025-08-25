import React from 'react';
import AutocompleteInput from './AutoCompleteInput';

const MultiInputLayout = ({
  config,
  values,
  onInputChange,
  onAddBid,
  suggestions,
  onSuggestionClick,
  isLoading,
  showSessionSelector
}) => (
  <>
    {/* Map over the fields from config to render inputs */}
    {config.fields.map(field => (
      <div className="input-row" key={field.id}>
        <label>{field.label}</label>
        {field.hasAutocomplete ? (
          <AutocompleteInput
            value={values[field.id] || ''}
            onChange={(val) => onInputChange(field.id, val)}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
           suggestions={suggestions[field.id] || []}
            onSuggestionClick={(val) => onSuggestionClick(field.id, val)}
          />
        ) : (
          <input
            type="tel"
            maxLength={field.maxLength}
            value={values[field.id] || ''}
            onChange={(e) => onInputChange(field.id, e.target.value.replace(/[^0-9]/g, ''))}
            placeholder={field.placeholder}
            disabled={isLoading}
          />
        )}
      </div>
    ))}
    <button className="btn-add-bid" onClick={onAddBid} disabled={isLoading}>
      {isLoading ? 'Adding...' : 'ADD BID'}
    </button>
  </>
);

export default MultiInputLayout;