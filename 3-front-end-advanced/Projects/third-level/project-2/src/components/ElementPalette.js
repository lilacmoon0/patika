import React from 'react';
import './ElementPalette.css';

const ElementPalette = ({ elementTypes, onDragStart }) => {
  return (
    <div className="element-palette">
      <div className="palette-header">
        <h3>✨ Form Elements</h3>
        <div className="palette-subtitle">Drag to create</div>
      </div>
      <div className="element-list">
        {elementTypes.map((elementType) => (
          <div
            key={elementType.type}
            className="element-item"
            draggable
            onDragStart={(e) => onDragStart(e, elementType)}
          >
            <div className="element-icon-wrapper">
              <span className="element-icon">{elementType.icon}</span>
            </div>
            <div className="element-content">
              <span className="element-label">{elementType.label}</span>
              <span className="element-description">Click and drag</span>
            </div>
            <div className="drag-indicator">⋮⋮</div>
          </div>
        ))}
      </div>
      <div className="palette-instructions">
        <div className="instruction-card">
          <div className="instruction-icon">🎯</div>
          <div className="instruction-text">
            <strong>Quick Start</strong>
            <p>Drag elements to the canvas to build your form</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementPalette;
