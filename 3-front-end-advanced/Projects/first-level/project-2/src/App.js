import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AppProvider } from './context/AppContext';
import { NotificationSystem } from './components/NotificationSystem';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { Navigation } from './components/Navigation';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 80px;
`;

function App() {
  return (
    <AppProvider>
      <AppContainer>
        <Navigation />
        <NotificationSystem />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppContainer>
    </AppProvider>
  );
}

export default App;
