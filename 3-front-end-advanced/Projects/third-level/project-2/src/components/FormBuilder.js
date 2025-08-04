import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './FormBuilder.css';
import ElementPalette from './ElementPalette';
import FormCanvas from './FormCanvas';
import FormPreview from './FormPreview';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Available form element types
  const elementTypes = [
    { 
      type: 'text', 
      label: 'Text Input', 
      icon: '📝',
      defaultProps: { 
        label: 'Text Input', 
        placeholder: 'Enter text...', 
        required: false 
      }
    },
    { 
      type: 'email', 
      label: 'Email Input', 
      icon: '📧',
      defaultProps: { 
        label: 'Email', 
        placeholder: 'Enter email...', 
        required: false 
      }
    },
    { 
      type: 'password', 
      label: 'Password Input', 
      icon: '🔒',
      defaultProps: { 
        label: 'Password', 
        placeholder: 'Enter password...', 
        required: false 
      }
    },
    { 
      type: 'textarea', 
      label: 'Text Area', 
      icon: '📄',
      defaultProps: { 
        label: 'Text Area', 
        placeholder: 'Enter text...', 
        rows: 4, 
        required: false 
      }
    },
    { 
      type: 'select', 
      label: 'Select Dropdown', 
      icon: '📋',
      defaultProps: { 
        label: 'Select Option', 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'radio', 
      label: 'Radio Buttons', 
      icon: '🔘',
      defaultProps: { 
        label: 'Choose One', 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'checkbox', 
      label: 'Checkboxes', 
      icon: '☑️',
      defaultProps: { 
        label: 'Select Multiple', 
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      }
    },
    { 
      type: 'number', 
      label: 'Number Input', 
      icon: '🔢',
      defaultProps: { 
        label: 'Number', 
        placeholder: 'Enter number...', 
        min: 0, 
        max: 100, 
        required: false 
      }
    },
    { 
      type: 'date', 
      label: 'Date Input', 
      icon: '📅',
      defaultProps: { 
        label: 'Date', 
        required: false 
      }
    },
    { 
      type: 'file', 
      label: 'File Upload', 
      icon: '📎',
      defaultProps: { 
        label: 'Upload File', 
        accept: '*/*', 
        required: false 
      }
    }
  ];

  const handleDragStart = (e, elementType) => {
    setDraggedElement(elementType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedElement) {
      const newElement = {
        id: uuidv4(),
        type: draggedElement.type,
        ...draggedElement.defaultProps
      };
      setFormElements([...formElements, newElement]);
      setDraggedElement(null);
    }
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (updatedElement) => {
    setFormElements(formElements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
    setSelectedElement(updatedElement);
  };

  const handleElementDelete = (elementId) => {
    setFormElements(formElements.filter(el => el.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  };

  const handleElementMove = (fromIndex, toIndex) => {
    const updatedElements = [...formElements];
    const [movedElement] = updatedElements.splice(fromIndex, 1);
    updatedElements.splice(toIndex, 0, movedElement);
    setFormElements(updatedElements);
  };

  const clearForm = () => {
    setFormElements([]);
    setSelectedElement(null);
  };

  const exportForm = () => {
    const formData = {
      elements: formElements,
      createdAt: new Date().toISOString()
    };
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'form-builder-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="form-builder">
      <div className="form-builder-header">
        <div className="form-builder-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <button className="btn btn-primary" onClick={exportForm}>
            💾 Export Form
          </button>
          <button className="btn btn-danger" onClick={clearForm}>
            🗑️ Clear All
          </button>
        </div>
      </div>

      <div className="form-builder-content">
        {!showPreview ? (
          <>
            <ElementPalette 
              elementTypes={elementTypes}
              onDragStart={handleDragStart}
            />
            <FormCanvas 
              formElements={formElements}
              selectedElement={selectedElement}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onElementSelect={handleElementSelect}
              onElementUpdate={handleElementUpdate}
              onElementDelete={handleElementDelete}
              onElementMove={handleElementMove}
            />
          </>
        ) : (
          <FormPreview formElements={formElements} />
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
