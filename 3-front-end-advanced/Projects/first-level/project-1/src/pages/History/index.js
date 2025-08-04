import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
`;






export const History = () => {

  const [calculations, setCalculations] = useState(() => {
    const savedCalculations = localStorage.getItem('bmiCalculations');
    return savedCalculations ? JSON.parse(savedCalculations) : [];
  });

  const clearHistory = () => {
    setCalculations([]);
    localStorage.removeItem('bmiCalculations');
  };

  return (
    <Container>
      <Title>History</Title>
      {calculations.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50' }}>Recent Calculations</h3>
            <button 
              onClick={clearHistory}
              style={{ 
                padding: '5px 10px', 
                background: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Clear History
            </button>
          </div>
          {calculations.slice(0, 5).map((calc) => (
            <div 
              key={calc.id} 
              style={{ 
                background: '#f8f9fa', 
                padding: '10px', 
                marginBottom: '10px', 
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            >
              <strong>BMI: {calc.bmi}</strong> - {calc.category}<br/>
              <small style={{ color: '#6c757d' }}>
                {calc.weight} {calc.unit === 'metric' ? 'kg' : 'lbs'} / {calc.height} {calc.unit === 'metric' ? 'cm' : 'in'} - {calc.date}
              </small>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}