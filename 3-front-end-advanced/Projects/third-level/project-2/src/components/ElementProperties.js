import React, { useState, useEffect } from 'react';
import './ElementProperties.css';

const ElementProperties = ({ element, onUpdate }) => {
  const [localElement, setLocalElement] = useState(element);

  useEffect(() => {
    setLocalElement(element);
  }, [element]);

  const handleChange = (field, value) => {
    const updatedElement = { ...localElement, [field]: value };
    setLocalElement(updatedElement);
    onUpdate(updatedElement);
  };

  const handleOptionsChange = (options) => {
    const updatedElement = { ...localElement, options };
    setLocalElement(updatedElement);
    onUpdate(updatedElement);
  };

  const addOption = () => {
    const newOptions = [...localElement.options, `Option ${localElement.options.length + 1}`];
    handleOptionsChange(newOptions);
  };

  const removeOption = (index) => {
    const newOptions = localElement.options.filter((_, i) => i !== index);
    handleOptionsChange(newOptions);
  };

  const updateOption = (index, value) => {
    const newOptions = localElement.options.map((option, i) => 
      i === index ? value : option
    );
    handleOptionsChange(newOptions);
  };

  const renderPropertiesForm = () => {
    return (
      <div className="properties-form">
        <div className="property-group">
          <label>Label</label>
          <input
            type="text"
            value={localElement.label}
            onChange={(e) => handleChange('label', e.target.value)}
          />
        </div>

        {['text', 'email', 'password', 'textarea', 'number'].includes(localElement.type) && (
          <div className="property-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={localElement.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
            />
          </div>
        )}

        {localElement.type === 'textarea' && (
          <div className="property-group">
            <label>Rows</label>
            <input
              type="number"
              value={localElement.rows || 4}
              min="1"
              max="10"
              onChange={(e) => handleChange('rows', parseInt(e.target.value))}
            />
          </div>
        )}

        {localElement.type === 'number' && (
          <>
            <div className="property-group">
              <label>Minimum Value</label>
              <input
                type="number"
                value={localElement.min || 0}
                onChange={(e) => handleChange('min', parseInt(e.target.value))}
              />
            </div>
            <div className="property-group">
              <label>Maximum Value</label>
              <input
                type="number"
                value={localElement.max || 100}
                onChange={(e) => handleChange('max', parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        {localElement.type === 'file' && (
          <div className="property-group">
            <label>Accepted File Types</label>
            <input
              type="text"
              value={localElement.accept || '*/*'}
              placeholder="e.g., image/*,.pdf,.doc"
              onChange={(e) => handleChange('accept', e.target.value)}
            />
          </div>
        )}

        {['select', 'radio', 'checkbox'].includes(localElement.type) && (
          <div className="property-group">
            <label>Options</label>
            <div className="options-list">
              {localElement.options.map((option, index) => (
                <div key={index} className="option-item">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="remove-option-btn"
                    onClick={() => removeOption(index)}
                    disabled={localElement.options.length <= 1}
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-option-btn"
                onClick={addOption}
              >
                ➕ Add Option
              </button>
            </div>
          </div>
        )}

        <div className="property-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={localElement.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
            />
            Required Field
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="element-properties">
      <h3>Element Properties</h3>
      <div className="selected-element-info">
        <strong>{localElement.label}</strong>
        <span className="element-type">({localElement.type})</span>
      </div>
      {renderPropertiesForm()}
    </div>
  );
};

export default ElementProperties;
