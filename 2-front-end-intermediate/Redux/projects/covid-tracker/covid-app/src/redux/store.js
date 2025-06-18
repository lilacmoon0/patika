import { configureStore } from "@reduxjs/toolkit";
import { covidReducer } from "./covidSlice";

export const store = configureStore({
  reducer: { covid: covidReducer },
});

export default store;
