import React from 'react';
import './App.css';
import FormBuilder from './components/FormBuilder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Form Builder</h1>
        <p>Drag and drop form elements to build your custom form</p>
      </header>
      <FormBuilder />
    </div>
  );
}

export default App;
