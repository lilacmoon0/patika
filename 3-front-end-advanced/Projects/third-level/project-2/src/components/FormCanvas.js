import React from 'react';
import './FormCanvas.css';
import FormElement from './FormElement';
import ElementProperties from './ElementProperties';

const FormCanvas = ({
  formElements,
  selectedElement,
  onDragOver,
  onDrop,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onElementMove
}) => {
  const handleElementDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleElementDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleElementDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      onElementMove(dragIndex, dropIndex);
    }
  };

  return (
    <div className="form-canvas-container">
      <div 
        className="form-canvas"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <h3>Form Canvas</h3>
        {formElements.length === 0 ? (
          <div className="empty-canvas">
            <div className="empty-message">
              <span className="drop-icon">📋</span>
              <p>Drop form elements here to start building your form</p>
            </div>
          </div>
        ) : (
          <div className="form-elements">
            {formElements.map((element, index) => (
              <div
                key={element.id}
                className={`form-element-wrapper ${
                  selectedElement && selectedElement.id === element.id ? 'selected' : ''
                }`}
                draggable
                onDragStart={(e) => handleElementDragStart(e, index)}
                onDragOver={handleElementDragOver}
                onDrop={(e) => handleElementDrop(e, index)}
                onClick={() => onElementSelect(element)}
              >
                <FormElement element={element} />
                <div className="element-controls">
                  <button
                    className="control-btn move-btn"
                    title="Drag to reorder"
                  >
                    ⚡
                  </button>
                  <button
                    className="control-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementDelete(element.id);
                    }}
                    title="Delete element"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedElement && (
        <ElementProperties
          element={selectedElement}
          onUpdate={onElementUpdate}
        />
      )}
    </div>
  );
};

export default FormCanvas;
