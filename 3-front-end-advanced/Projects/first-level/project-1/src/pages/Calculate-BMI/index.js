
import { useState } from 'react';
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

const FormContainer = styled.div`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3498db;
  }

  &:invalid {
    border-color: #e74c3c;
  }
`;

const UnitToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const UnitButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
  padding: 10px 20px;
  border: 2px solid #3498db;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#3498db'};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

const CalculateButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #219a52;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  background: ${props => props.category === 'Normal Weight' ? '#d4edda' : 
                       props.category === 'Underweight' ? '#cce7ff' :
                       props.category === 'Overweight' ? '#fff3cd' : '#f8d7da'};
  border: 1px solid ${props => props.category === 'Normal Weight' ? '#c3e6cb' : 
                               props.category === 'Underweight' ? '#99d6ff' :
                               props.category === 'Overweight' ? '#ffeaa7' : '#f5c6cb'};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const BMIValue = styled.h2`
  font-size: 36px;
  margin: 10px 0;
  color: #2c3e50;
`;

const BMICategory = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: ${props => props.category === 'Normal Weight' ? '#155724' : 
                   props.category === 'Underweight' ? '#004085' :
                   props.category === 'Overweight' ? '#856404' : '#721c24'};
`;

const HealthTip = styled.p`
  font-style: italic;
  color: #6c757d;
  margin-top: 15px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;

export const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue >= 18.5 && bmiValue < 25) return 'Normal Weight';
    if (bmiValue >= 25 && bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  const getHealthTip = (category) => {
    const tips = {
      'Underweight': 'Consider consulting a healthcare provider about healthy weight gain strategies.',
      'Normal Weight': 'Great job! Maintain your healthy lifestyle with balanced diet and regular exercise.',
      'Overweight': 'Consider incorporating more physical activity and a balanced diet into your routine.',
      'Obese': 'It may be beneficial to consult with a healthcare provider about weight management strategies.'
    };
    return tips[category] || '';
  };

  const calculateBMI = () => {
    console.log('Button clicked! Weight:', weight, 'Height:', height, 'Unit:', unit);
    setError('');
    
    if (!weight || !height || weight <= 0 || height <= 0) {
      console.log('Validation failed');
      setError('Please enter valid weight and height values.');
      return;
    }

    console.log('Validation passed, calculating...');
    
    let bmiValue;
    let weightInKg = parseFloat(weight);
    let heightInM = parseFloat(height);

    if (unit === 'imperial') {
      // Convert pounds to kg and inches to meters
      weightInKg = weightInKg * 0.453592;
      heightInM = heightInM * 0.0254;
    } else {
      // Convert cm to meters if needed
      if (heightInM > 3) {
        heightInM = heightInM / 100;
      }
    }

    bmiValue = weightInKg / (heightInM * heightInM);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    const bmiCategory = getBMICategory(roundedBMI);

    console.log('BMI Result:', roundedBMI, 'Category:', bmiCategory);

    setBmi(roundedBMI);
    setCategory(bmiCategory);

    // Save to localStorage for history page
    try {
      const newCalculation = {
        id: Date.now(),
        bmi: roundedBMI,
        category: bmiCategory,
        weight: parseFloat(weight),
        height: parseFloat(height),
        unit: unit,
        date: new Date().toLocaleString()
      };

      // Get existing calculations and add new one
      const existingCalculations = JSON.parse(localStorage.getItem('bmiCalculations') || '[]');
      const updatedCalculations = [newCalculation, ...existingCalculations.slice(0, 9)];
      localStorage.setItem('bmiCalculations', JSON.stringify(updatedCalculations));
      console.log('Saved to localStorage successfully');
    } catch (error) {
      console.error('localStorage error:', error);
    }
  };

  const clearForm = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setError('');
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    // Clear form when switching units to avoid confusion
    clearForm();
  };



  return (
    <Container>
      <Title>BMI Calculator</Title>
      
      <FormContainer>
        <UnitToggle>
          <UnitButton 
            active={unit === 'metric'} 
            onClick={() => handleUnitChange('metric')}
          >
            Metric (kg/cm)
          </UnitButton>
          <UnitButton 
            active={unit === 'imperial'} 
            onClick={() => handleUnitChange('imperial')}
          >
            Imperial (lbs/in)
          </UnitButton>
        </UnitToggle>

        <InputGroup>
          <Label>
            Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
          </Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            min="1"
            step="0.1"
          />
        </InputGroup>

        <InputGroup>
          <Label>
            Height ({unit === 'metric' ? 'cm' : 'inches'}):
          </Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
            min="1"
            step="0.1"
          />
        </InputGroup>

        <CalculateButton 
          onClick={calculateBMI}
        >
          Calculate BMI
        </CalculateButton>

        <ClearButton onClick={clearForm}>
          Clear Form
        </ClearButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>

      {bmi && (
        <ResultContainer category={category}>
          <h3>Your BMI Result</h3>
          <BMIValue>{bmi}</BMIValue>
          <BMICategory category={category}>{category}</BMICategory>
          <HealthTip>{getHealthTip(category)}</HealthTip>
        </ResultContainer>
      )}
    </Container>
  );
}