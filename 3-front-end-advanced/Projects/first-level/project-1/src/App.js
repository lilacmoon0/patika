import { BMICalculator } from './pages/Calculate-BMI';
import { Info } from './pages/Info';
import { History } from './pages/History';
import { Routes, Route, Link, useLocation } from 'react-router';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Navigation = styled.nav`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
`;

const NavButton = styled(Link)`
  padding: 10px 15px;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#3498db'};
  border: 2px solid #3498db;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #3498db;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MainContent = styled.div`
  padding-top: 60px; /* Space for fixed navigation */
`;

function App() {
  const location = useLocation();

  return (
    <AppContainer>
      <Navigation>
        <NavButton 
          to="/" 
          active={location.pathname === '/' ? 'true' : undefined}
        >
          🧮 Calculator
        </NavButton>
        <NavButton 
          to="/info" 
          active={location.pathname === '/info' ? 'true' : undefined}
        >
          ℹ️ Info
        </NavButton>
        <NavButton 
          to="/history" 
          active={location.pathname === '/history' ? 'true' : undefined}
        >
          📊 History
        </NavButton>
      </Navigation>

      <MainContent>
        <Routes>
          <Route path="/" element={<BMICalculator />} />
          <Route path="/info" element={<Info />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
