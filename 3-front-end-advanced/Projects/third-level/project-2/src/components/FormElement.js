import React from 'react';

const FormElement = ({ element }) => {
  const renderElement = () => {
    switch (element.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              required={element.required}
              disabled
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <textarea
              placeholder={element.placeholder}
              rows={element.rows}
              required={element.required}
              disabled
            />
          </div>
        );

      case 'select':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <select required={element.required} disabled>
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
          <div className="form-group">
            <label className="group-label">{element.label} {element.required && <span className="required">*</span>}</label>
            <div className="radio-group">
              {element.options.map((option, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name={`radio-${element.id}`}
                    value={option}
                    required={element.required}
                    disabled
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="form-group">
            <label className="group-label">{element.label} {element.required && <span className="required">*</span>}</label>
            <div className="checkbox-group">
              {element.options.map((option, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    required={element.required && index === 0}
                    disabled
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );

      case 'number':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="number"
              placeholder={element.placeholder}
              min={element.min}
              max={element.max}
              required={element.required}
              disabled
            />
          </div>
        );

      case 'date':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="date"
              required={element.required}
              disabled
            />
          </div>
        );

      case 'file':
        return (
          <div className="form-group">
            <label>{element.label} {element.required && <span className="required">*</span>}</label>
            <input
              type="file"
              accept={element.accept}
              required={element.required}
              disabled
            />
          </div>
        );

      default:
        return <div>Unknown element type</div>;
    }
  };

  return <div className="form-element">{renderElement()}</div>;
};

export default FormElement;
