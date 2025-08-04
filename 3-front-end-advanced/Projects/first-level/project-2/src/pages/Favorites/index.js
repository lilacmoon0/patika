import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { showNotification } from '../../components/NotificationSystem';

const FavoritesContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15);
  border: 2px solid rgba(255, 192, 203, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  background: linear-gradient(45deg, #FF69B4, #DDA0DD, #87CEEB);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
  
  &::after {
    content: '💖✨';
    display: block;
    font-size: 1.5rem;
    margin-top: 10px;
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const FavoriteCard = styled.div`
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
  height: 300px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #8B4A9C;
  margin-bottom: 10px;
  line-height: 1.3;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #FF69B4;
  margin: 10px 0;
  text-shadow: 0 1px 3px rgba(255, 105, 180, 0.3);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  ${props => props.primary && `
    background: linear-gradient(45deg, #FF69B4, #FFB6C1);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
    
    &:hover {
      background: linear-gradient(45deg, #FF1493, #FF69B4);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    }
  `}
  
  ${props => props.remove && `
    background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    
    &:hover {
      background: linear-gradient(45deg, #FF5252, #FF6B6B);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    }
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 100px 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  color: #8B4A9C;
  margin-bottom: 15px;
  font-weight: 600;
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(45deg, #FF69B4, #FFB6C1);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  
  &:hover {
    background: linear-gradient(45deg, #FF1493, #FF69B4);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5);
  }
`;

export const Favorites = () => {
  const { favorites, removeFromFavorites, addToCart, isInCart, getCartItemQuantity } = useApp();

  const handleRemoveFromFavorites = (productId) => {
    removeFromFavorites(productId);
    showNotification('Removed from favorites! 💔', 'info');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`Added ${product.title.substring(0, 30)}... to cart! 🛒`, 'success');
  };

  if (favorites.length === 0) {
    return (
      <FavoritesContainer>
        <ContentWrapper>
          <PageTitle>My Favorites</PageTitle>
          <EmptyState>
            <EmptyIcon>💔</EmptyIcon>
            <EmptyTitle>No Favorites Yet</EmptyTitle>
            <EmptyMessage>
              You haven't added any items to your favorites yet. 
              Start exploring our amazing products and save the ones you love!
            </EmptyMessage>
            <ShopButton to="/">Start Shopping</ShopButton>
          </EmptyState>
        </ContentWrapper>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <ContentWrapper>
        <PageTitle>My Favorites</PageTitle>
        <FavoritesGrid>
          {favorites.map((product) => (
            <FavoriteCard key={product.id}>
              <StyledLink to={`/product/${product.id}`}>
                <ProductImage 
                  src={product.image} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/320x200?text=No+Image';
                  }}
                />
              </StyledLink>
              <CardContent>
                <div>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>${product.price}</ProductPrice>
                </div>
                <ButtonGroup>
                  <ActionButton 
                    primary 
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? `In Cart (${getCartItemQuantity(product.id)})` : 'Add to Cart'}
                  </ActionButton>
                  <ActionButton 
                    remove 
                    onClick={() => handleRemoveFromFavorites(product.id)}
                  >
                    Remove 💔
                  </ActionButton>
                </ButtonGroup>
              </CardContent>
            </FavoriteCard>
          ))}
        </FavoritesGrid>
      </ContentWrapper>
    </FavoritesContainer>
  );
};