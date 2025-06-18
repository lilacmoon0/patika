import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  words: [],
  currentWordIndex: 0,
  currentWord: "",
  inputValue: "",
  isGameStarted: false,
  isGameOver: false,
  timeLeft: 60,
  score: { correctWord: 0, falseWord: 0, accuracy: 0},
  typedResults: [],
};

export const fetchWords = createAsyncThunk(
  "words/fetchWords",
  async (_, rejectWithValue) => {
    const url = `https://random-word-api.herokuapp.com/word?number=42`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setCurrentWordIndex: (state, action) => {
      state.currentWordIndex = action.payload;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    startGame: (state) => {
      state.isGameStarted = true;
      state.isGameOver = false;
      state.timeLeft = 60;
      state.score = { correctWord: 0, falseWord: 0, accuracy: 0, result: 0 };
      state.currentWordIndex = 0;
      state.inputValue = "";
      state.typedResults = []; 
    },
    endGame: (state) => {
      state.isGameStarted = false;
      state.isGameOver = true;
    },
    decrementTimeLeft: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    incrementScore: (state, action) => {
      const { isCorrect } = action.payload;
      if (isCorrect) {
        state.score.correctWord += 1;
      } else {
        state.score.falseWord += 1;
      }
      
      state.typedResults[state.currentWordIndex] = isCorrect;
      
      const totalWords = state.score.correctWord + state.score.falseWord;
      state.score.accuracy = totalWords ? Math.round((state.score.correctWord / totalWords) * 100) : 0;
      state.score.result = state.score.correctWord;
    },
    resetTime: (state) => {
      state.timeLeft = 60;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  resetTime,
  setWords,
  setCurrentWordIndex,
  setCurrentWord,
  setInputValue,
  startGame,
  endGame,
  decrementTimeLeft,
  incrementScore,
} = wordsSlice.actions;

export default wordsSlice.reducer;