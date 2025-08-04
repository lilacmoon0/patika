import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { showNotification } from './NotificationSystem';

const ProductListContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15);
  border: 2px solid rgba(255, 192, 203, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(255, 105, 180, 0.25);
    border-color: rgba(255, 105, 180, 0.5);
  }

`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
`;

const ProductInfo = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #333;
  line-height: 1.3;
  height: 2.6rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0 0 10px 0;
  height: 3.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 10px 0 15px 0;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  
  ${props => props.primary && `
    background: linear-gradient(45deg, #FF69B4, #FFB6C1);
    color: white;
    
    &:hover {
      background: linear-gradient(45deg, #FF1493, #FF69B4);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
    }
  `}
  
  ${props => props.secondary && `
    background: ${props.isActive ? 'linear-gradient(45deg, #FF6B6B, #FF8E8E)' : 'linear-gradient(45deg, #95A5A6, #BDC3C7)'};
    color: white;
    
    &:hover {
      background: ${props.isActive ? 'linear-gradient(45deg, #FF5252, #FF6B6B)' : 'linear-gradient(45deg, #7F8C8D, #95A5A6)'};
      transform: translateY(-2px);
      box-shadow: 0 4px 15px ${props.isActive ? 'rgba(255, 107, 107, 0.4)' : 'rgba(149, 165, 166, 0.4)'};
    }
  `}
  
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #e74c3c;
  background-color: #ffeaea;
  border-radius: 8px;
  margin: 20px 0;
`;

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { 
    addToCart, 
    addToFavorites, 
    removeFromFavorites, 
    isInCart, 
    isInFavorites,
    getCartItemQuantity 
  } = useApp();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToFavorites = (product) => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
      showNotification('Removed from favorites! 💔', 'info');
    } else {
      addToFavorites(product);
      showNotification('Added to favorites! 💖', 'success');
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification('Added to cart! 🛒', 'success');
  };

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <ProductListContainer>
        <LoadingContainer>Loading products...</LoadingContainer>
      </ProductListContainer>
    );
  }

  if (error) {
    return (
      <ProductListContainer>
        <ErrorContainer>{error}</ErrorContainer>
      </ProductListContainer>
    );
  }

  return (
    <ProductListContainer>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <StyledLink to={`/product/${product.id}`}>
              <ProductImage 
                src={product.image} 
                alt={product.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/280x200?text=No+Image';
                }}
              />
            </StyledLink>
            <ProductInfo>
              <div>
                <ProductTitle>{shortenText(product.title, 60)}</ProductTitle>
                <ProductDescription>{shortenText(product.description, 120)}</ProductDescription>
                <ProductPrice>${product.price}</ProductPrice>
              </div>
              <ProductActions>
                <ActionButton 
                  primary 
                  onClick={() => handleAddToCart(product)}
                  disabled={isInCart(product.id)}
                >
                  {isInCart(product.id) ? `In Cart (${getCartItemQuantity(product.id)})` : 'Add to Cart'}
                </ActionButton>
                <ActionButton 
                  secondary 
                  isActive={isInFavorites(product.id)}
                  onClick={() => handleAddToFavorites(product)}
                >
                  {isInFavorites(product.id) ? '💖 Favorited' : '♡ Favorite'}
                </ActionButton>
              </ProductActions>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </ProductListContainer>
  );
};
