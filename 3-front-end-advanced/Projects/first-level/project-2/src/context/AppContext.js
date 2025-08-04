import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

const FAVORITES_ACTIONS = {
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  LOAD_FAVORITES: 'LOAD_FAVORITES'
};

// Initial state
const initialState = {
  cart: [],
  favorites: [],
  cartTotal: 0,
  cartItemCount: 0
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
        
        const newState = {
          ...state,
          cart: updatedCart
        };
        
        return calculateCartTotals(newState);
      } else {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1
        };
        
        const newState = {
          ...state,
          cart: [...state.cart, newItem]
        };
        
        return calculateCartTotals(newState);
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const newState = {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
      
      return calculateCartTotals(newState);
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newState = {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
      
      return calculateCartTotals(newState);
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        cartItemCount: 0
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      const newState = {
        ...state,
        cart: action.payload
      };
      
      return calculateCartTotals(newState);
    }

    case FAVORITES_ACTIONS.ADD_TO_FAVORITES: {
      const isAlreadyFavorite = state.favorites.some(item => item.id === action.payload.id);
      
      if (isAlreadyFavorite) {
        return state;
      }
      
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    }

    case FAVORITES_ACTIONS.REMOVE_FROM_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload)
      };
    }

    case FAVORITES_ACTIONS.LOAD_FAVORITES: {
      return {
        ...state,
        favorites: action.payload
      };
    }

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (state) => {
  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  
  return {
    ...state,
    cartTotal: Math.round(cartTotal * 100) / 100,
    cartItemCount
  };
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce_cart');
    const savedFavorites = localStorage.getItem('ecommerce_favorites');

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        dispatch({ type: FAVORITES_ACTIONS.LOAD_FAVORITES, payload: parsedFavorites });
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce_favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { ...product, quantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: productId
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Favorites actions
  const addToFavorites = (product) => {
    dispatch({
      type: FAVORITES_ACTIONS.ADD_TO_FAVORITES,
      payload: product
    });
  };

  const removeFromFavorites = (productId) => {
    dispatch({
      type: FAVORITES_ACTIONS.REMOVE_FROM_FAVORITES,
      payload: productId
    });
  };

  // Helper functions
  const isInCart = (productId) => {
    return state.cart.some(item => item.id === productId);
  };

  const isInFavorites = (productId) => {
    return state.favorites.some(item => item.id === productId);
  };

  const getCartItemQuantity = (productId) => {
    const item = state.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    // State
    cart: state.cart,
    favorites: state.favorites,
    cartTotal: state.cartTotal,
    cartItemCount: state.cartItemCount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    
    // Helper functions
    isInCart,
    isInFavorites,
    getCartItemQuantity
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
