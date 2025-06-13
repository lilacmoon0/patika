import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  paragraphs: [],
  includeHtml: false,
  paras: 1,
  status: "idle",
  error: null,
};

// Thunk for fetching paragraphs
export const fetchParagraphs = createAsyncThunk(
  'para/fetchParagraphs',
  async (_, { getState, rejectWithValue }) => {
    const { paras, includeHtml } = getState().para;
    const format = includeHtml ? "html" : "text";
    const url = `https://baconipsum.com/api/?type=all-meat&paras=${paras}&format=${format}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const paraSlice = createSlice({
  name: 'para',
  initialState,
  reducers: {
    setParas: (state, action) => {
      state.paras = action.payload;
    },
    setIncludeHtml: (state, action) => {
      state.includeHtml = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchParagraphs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paragraphs = action.payload;
      })
      .addCase(fetchParagraphs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { setParas, setIncludeHtml } = paraSlice.actions;
export const paraReducer = paraSlice.reducer;