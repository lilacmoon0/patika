import { configureStore } from "@reduxjs/toolkit";
import { forecastReducer } from "./slices/forecast";

export const store = configureStore({
  reducer: { forecast: forecastReducer },
});

export default store;
