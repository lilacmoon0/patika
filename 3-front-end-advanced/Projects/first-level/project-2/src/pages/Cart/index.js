import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { showNotification } from '../../components/NotificationSystem';

const CartContainer = styled.div`
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
    content: '🛒✨';
    display: block;
    font-size: 1.5rem;
    margin-top: 10px;
    animation: bounce 2s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const ItemsTitle = styled.h2`
  font-size: 1.8rem;
  color: #8B4A9C;
  margin-bottom: 25px;
  font-weight: 600;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 192, 203, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 105, 180, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  background: white;
  padding: 5px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  font-size: 1.1rem;
  color: #8B4A9C;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #FF69B4;
  font-weight: bold;
  margin-bottom: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(45deg, #FF69B4, #FFB6C1);
  color: white;
  font-size: 1rem;
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
  font-size: 1.1rem;
  font-weight: 600;
  color: #8B4A9C;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(45deg, #FF5252, #FF6B6B);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }
`;

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h2`
  font-size: 1.8rem;
  color: #8B4A9C;
  margin-bottom: 25px;
  font-weight: 600;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 0;
  font-size: 1.1rem;
`;

const SummaryLabel = styled.span`
  color: #666;
`;

const SummaryValue = styled.span`
  color: #8B4A9C;
  font-weight: 600;
`;

const TotalRow = styled(SummaryRow)`
  border-top: 2px solid rgba(255, 192, 203, 0.3);
  margin-top: 20px;
  padding-top: 20px;
  font-size: 1.4rem;
`;

const TotalLabel = styled(SummaryLabel)`
  color: #8B4A9C;
  font-weight: bold;
`;

const TotalValue = styled(SummaryValue)`
  color: #FF69B4;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(45deg, #FF69B4, #FFB6C1);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  
  &:hover {
    background: linear-gradient(45deg, #FF1493, #FF69B4);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 105, 180, 0.5);
  }
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

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartItemCount } = useApp();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleCheckout = () => {
    showNotification('Thank you for your purchase! Your order is being processed. 🎉', 'success');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <CartContainer>
        <ContentWrapper>
          <PageTitle>Shopping Cart</PageTitle>
          <EmptyState>
            <EmptyIcon>🛒</EmptyIcon>
            <EmptyTitle>Your Cart is Empty</EmptyTitle>
            <EmptyMessage>
              Looks like you haven't added any items to your cart yet. 
              Start shopping and fill it with amazing products!
            </EmptyMessage>
            <ShopButton to="/">Start Shopping</ShopButton>
          </EmptyState>
        </ContentWrapper>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <ContentWrapper>
        <PageTitle>Shopping Cart</PageTitle>
        <CartLayout>
          <CartItems>
            <ItemsTitle>Cart Items ({cartItemCount})</ItemsTitle>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <ItemImage 
                  src={item.image} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
                <ItemDetails>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemPrice>${item.price}</ItemPrice>
                  <QuantityControls>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      +
                    </QuantityButton>
                  </QuantityControls>
                </ItemDetails>
                <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>
          
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryRow>
              <SummaryLabel>Subtotal:</SummaryLabel>
              <SummaryValue>${cartTotal.toFixed(2)}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Shipping:</SummaryLabel>
              <SummaryValue>${shipping.toFixed(2)}</SummaryValue>
            </SummaryRow>
            <SummaryRow>
              <SummaryLabel>Tax:</SummaryLabel>
              <SummaryValue>${tax.toFixed(2)}</SummaryValue>
            </SummaryRow>
            <TotalRow>
              <TotalLabel>Total:</TotalLabel>
              <TotalValue>${total.toFixed(2)}</TotalValue>
            </TotalRow>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout 💖
            </CheckoutButton>
          </OrderSummary>
        </CartLayout>
      </ContentWrapper>
    </CartContainer>
  );
};