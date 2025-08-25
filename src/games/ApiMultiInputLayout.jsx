import React from 'react';

const ApiMultiInputLayout = ({
  config,
  values,
  onInputChange,
  onApiAdd,
  isLoading,
}) => (
  <>
    {/* Map over the fields from config to render inputs */}
    {config.fields.map(field => (
      <div className="input-row" key={field.id}>
        <label>{field.label}</label>
        <input
          type="tel"
          maxLength={field.maxLength}
          value={values[field.id] || ''}
          onChange={(e) => onInputChange(field.id, e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={field.placeholder}
          disabled={isLoading}
        />
      </div>
    ))}
    <button className="btn-add-bid" onClick={onApiAdd} disabled={isLoading}>
      {isLoading ? 'Adding...' : 'ADD'}
    </button>
  </>
);

export default ApiMultiInputLayout;