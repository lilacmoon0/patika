import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useApp } from '../../context/AppContext';
import { showNotification } from '../../components/NotificationSystem';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #FFE5E5 0%, #FFD6E8 25%, #E8D5FF 50%, #D5E8FF 75%, #D5FFE8 100%);
  min-height: 100vh;
`;

const ProductWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 30px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 15px;
  background: white;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Category = styled.span`
  background: linear-gradient(45deg, #FFB6C1, #DDA0DD);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #8B4A9C;
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span`
  color: ${props => props.filled ? '#FFD700' : '#E0E0E0'};
  font-size: 1.2rem;
`;

const RatingText = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #FF69B4;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
  margin: 20px 0;
`;

const Description = styled.p`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 20px 0;
  text-align: justify;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityLabel = styled.span`
  font-weight: 600;
  color: #8B4A9C;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(45deg, #FF69B4, #FFB6C1);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #8B4A9C;
  min-width: 30px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
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
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    
    &:hover {
      background: linear-gradient(45deg, #FF1493, #FF69B4);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5);
    }
  `}
  
  ${props => props.secondary && `
    background: linear-gradient(45deg, #DDA0DD, #E6E6FA);
    color: #8B4A9C;
    box-shadow: 0 6px 20px rgba(221, 160, 221, 0.4);
    
    &:hover {
      background: linear-gradient(45deg, #DA70D6, #DDA0DD);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(221, 160, 221, 0.5);
      color: white;
    }
  `}
`;

const BackButton = styled.button`
  background: linear-gradient(45deg, #87CEEB, #B0E0E6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background: linear-gradient(45deg, #4682B4, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.4rem;
  color: #FF69B4;
  font-weight: 600;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.2rem;
  color: #FF69B4;
  background: linear-gradient(135deg, #FFE5E5, #FFD6E8);
  border-radius: 20px;
  margin: 20px 0;
  border: 2px solid #FFB6C1;
  font-weight: 600;
  gap: 20px;
`;

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const { 
    addToCart, 
    addToFavorites, 
    removeFromFavorites, 
    isInFavorites,
    isInCart,
    getCartItemQuantity
  } = useApp();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`Added ${quantity} ${product.title.substring(0, 30)}... to cart! 🛒`, 'success');
  };

  const handleAddToFavorites = () => {
    if (isInFavorites(product.id)) {
      removeFromFavorites(product.id);
      showNotification('Removed from favorites! 💔', 'info');
    } else {
      addToFavorites(product);
      showNotification('Added to favorites! 💖', 'success');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} filled>★</Star>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} filled>☆</Star>);
      } else {
        stars.push(<Star key={i}>☆</Star>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <ProductContainer>
        <LoadingContainer>Loading product details... 🌸</LoadingContainer>
      </ProductContainer>
    );
  }

  if (error) {
    return (
      <ProductContainer>
        <ErrorContainer>
          <div>{error}</div>
          <BackButton onClick={() => navigate('/')}>
            ← Back to Products
          </BackButton>
        </ErrorContainer>
      </ProductContainer>
    );
  }

  if (!product) {
    return (
      <ProductContainer>
        <ErrorContainer>
          <div>Product not found</div>
          <BackButton onClick={() => navigate('/')}>
            ← Back to Products
          </BackButton>
        </ErrorContainer>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <BackButton onClick={() => navigate('/')}>
        ← Back to Products
      </BackButton>
      
      <ProductWrapper>
        <ProductContent>
          <ImageSection>
            <MainImage 
              src={product.image} 
              alt={product.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
              }}
            />
          </ImageSection>
          
          <ProductInfo>
            <Category>{product.category}</Category>
            <ProductTitle>{product.title}</ProductTitle>
            
            {product.rating && (
              <Rating>
                <Stars>
                  {renderStars(product.rating.rate)}
                </Stars>
                <RatingText>
                  {product.rating.rate} ({product.rating.count} reviews)
                </RatingText>
              </Rating>
            )}
            
            <Price>${product.price}</Price>
            <Description>{product.description}</Description>
            
            <ActionSection>
              <QuantitySection>
                <QuantityLabel>Quantity:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton onClick={() => handleQuantityChange(1)}>
                    +
                  </QuantityButton>
                </QuantityControls>
              </QuantitySection>
              
              <ButtonGroup>
                <ActionButton primary onClick={handleAddToCart}>
                  {isInCart(product.id) ? `In Cart (${getCartItemQuantity(product.id)})` : 'Add to Cart'}
                </ActionButton>
                <ActionButton secondary onClick={handleAddToFavorites}>
                  {isInFavorites(product.id) ? '💖 Favorited' : '♡ Add to Favorites'}
                </ActionButton>
              </ButtonGroup>
            </ActionSection>
          </ProductInfo>
        </ProductContent>
      </ProductWrapper>
    </ProductContainer>
  );
};