import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import countryIsos from "./countryNames.json";
const initialState = {
  status: "idle",
  covidData: [],
  covidGlobalData: [],
  selectedCountry: "",
  countryIso: countryIsos.data,
};

export const fetchData = createAsyncThunk(
  "covid/fetchData",
  async (_, { getState, rejectWithValue }) => {
    const url = `https://covid-api.com/api/reports/total?iso=${
      getState().covid.selectedCountry
    }`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGlobalData = createAsyncThunk(
  "covid/fetchGlobalData",
  async (_, { rejectWithValue }) => {
    const url = `https://covid-api.com/api/reports/total`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.covidData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchGlobalData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGlobalData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.covidGlobalData = action.payload;
      })
      .addCase(fetchGlobalData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCountry } = covidSlice.actions;
export const covidReducer = covidSlice.reducer;
