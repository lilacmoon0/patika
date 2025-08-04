import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const NavContainer = styled.nav`
  background: linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 50%, #87CEEB 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(255, 105, 180, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 4px 15px rgba(255, 255, 255, 0.5);
  }
  
  &::after {
    content: '🛍️💕';
    margin-left: 8px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.3s ease;
    border-radius: 20px;
  }
  
  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
  }
  
  &:hover::before {
    left: 0;
  }
`;

const Badge = styled.span`
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 0.8rem;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 20, 147, 0.3);
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

export const Navigation = () => {
  const { cartItemCount, favorites } = useApp();
  
  return (
    <NavContainer>
      <NavWrapper>
        <Logo to="/">E-Commerce Store</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/favorites">
            Favorites
            {favorites.length > 0 && <Badge>{favorites.length}</Badge>}
          </NavLink>
          <NavLink to="/cart">
            Cart
            {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
      </NavWrapper>
    </NavContainer>
  );
};
