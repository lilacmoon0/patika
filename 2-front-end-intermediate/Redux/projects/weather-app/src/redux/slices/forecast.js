import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import coordinates from "../data/coordinates.json";
import weatherIcons from "../data/weatherIconsMap.json";

const emojiMap = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  "mainly-clear-day": "🌤️",
  "mainly-clear-night": "🌤️",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "☁️",
  "overcast-day": "☁️",
  "overcast-night": "☁️",
  "fog-day": "🌫️",
  "fog-night": "🌫️",
  "partly-cloudy-day-drizzle": "🌦️",
  "partly-cloudy-night-drizzle": "🌦️",
  drizzle: "🌧️",
  "partly-cloudy-day-rain": "🌦️",
  "partly-cloudy-night-rain": "🌧️",
  rain: "🌧️",
  "partly-cloudy-day-snow": "🌨️",
  "partly-cloudy-night-snow": "🌨️",
  snow: "❄️",
  "thunderstorms-day": "⛈️",
  "thunderstorms-night": "⛈️",
  "thunderstorms-day-rain": "⛈️",
  "thunderstorms-night-rain": "⛈️",
};

const initialState = {
  data: null,
  status: "idle",
  selectedCity: "Tokyo",
  coordinates: coordinates,
  weatherIcons: weatherIcons,
  emojiMap: emojiMap,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const cityObj = coordinates.find(
      (city) => city.name === state.forecast.selectedCity
    );
    if (!cityObj) {
      return rejectWithValue("City not found in coordinates list.");
    }
    const { lat, lng } = cityObj;
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max,pressure_msl_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,sunrise,sunset&hourly=temperature_2m,precipitation,rain,snowfall,cloud_cover&models=jma_seamless&timezone=auto`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCity } = forecastSlice.actions;
export const forecastReducer = forecastSlice.reducer;
