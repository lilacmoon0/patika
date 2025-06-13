import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import products from "./products.json";

const productsAdapter = createEntityAdapter();
export const productsSelectors = productsAdapter.getSelectors(
  (state) => state.products
);
const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.setAll(
    productsAdapter.getInitialState(),
    products
  ),
  reducers: {
    updateProducts: productsAdapter.updateOne,
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
