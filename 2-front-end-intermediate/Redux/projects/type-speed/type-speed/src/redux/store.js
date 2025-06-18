import {configureStore} from "@reduxjs/toolkit";
import wordsReducer from "./wordsSlice";

export const Store = configureStore({
  reducer: {words: wordsReducer
  },
});