import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './ProductsSlice/productsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;