import React, { useState } from 'react';
import './FormPreview.css';

const FormPreview = ({ formElements }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (elementId, value) => {
    setFormData(prev => ({
      ...prev,
      [elementId]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    alert('Form submitted! Check console for data.');
  };

  const renderPreviewElement = (element) => {
    switch (element.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              required={element.required}
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            />
          </div>
        );

      case 'textarea':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <textarea
              placeholder={element.placeholder}
              rows={element.rows}
              required={element.required}
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            />
          </div>
        );

      case 'select':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <select
              required={element.required}
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            >
              <option value="">Choose an option</option>
              {element.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'radio':
        return (
          <div key={element.id} className="form-group">
            <label className="group-label">{element.label} {element.required && <span className="required">*</span>}</label>
            <div className="radio-group">
              {element.options.map((option, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name={`radio-${element.id}`}
                    value={option}
                    required={element.required}
                    checked={formData[element.id] === option}
                    onChange={(e) => handleInputChange(element.id, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={element.id} className="form-group">
            <label className="group-label">{element.label} {element.required && <span className="required">*</span>}</label>
            <div className="checkbox-group">
              {element.options.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={(formData[element.id] || []).includes(option)}
                    onChange={(e) => {
                      const currentValues = formData[element.id] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter(v => v !== option);
                      handleInputChange(element.id, newValues);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="number"
              placeholder={element.placeholder}
              min={element.min}
              max={element.max}
              required={element.required}
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            />
          </div>
        );

      case 'date':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="date"
              required={element.required}
              value={formData[element.id] || ''}
              onChange={(e) => handleInputChange(element.id, e.target.value)}
            />
          </div>
        );

      case 'file':
        return (
          <div key={element.id} className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="file"
              accept={element.accept}
              required={element.required}
              onChange={(e) => handleInputChange(element.id, e.target.files[0])}
            />
          </div>
        );

      default:
        return <div key={element.id}>Unknown element type</div>;
    }
  };

  return (
    <div className="form-preview">
      <h3>Form Preview</h3>
      {formElements.length === 0 ? (
        <div className="empty-preview">
          <p>No form elements to preview. Add some elements to see the preview.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="preview-form">
          {formElements.map(renderPreviewElement)}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Form
            </button>
            <button 
              type="button" 
              className="reset-btn"
              onClick={() => setFormData({})}
            >
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormPreview;
