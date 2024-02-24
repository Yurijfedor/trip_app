import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWeatherForTrip,
  fetchPictures,
  fetchCurrentWeather,
  fetchCitySuggestions,
} from "./operations";
import { generateDateRange } from "../utils/dateUtils";

const { startDate, endDate } = generateDateRange(7);

const initialState = {
  trips: [
    {
      id: 1,
      city: "London",
      startDate,
      endDate,
      picture: "",
      forecast: "",
      citySuggestions: [],
    },
  ],
  selectedTrip: null,
  loading: false,
  error: null,
};

initialState.selectedTrip =
  initialState.trips.length > 0 ? initialState.trips[0] : null;

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    selectTrip(state, action) {
      state.selectedTrip = action.payload;
    },
    addTrip(state, action) {
      state.trips = [action.payload, ...state.trips];
    },
    removeTrip(state, action) {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPictures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.map((trip) =>
          trip.city === action.payload.address
            ? { ...trip, forecast: action.payload }
            : trip
        );
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTrip = {
          ...state.selectedTrip,
          currentWeather: action.payload,
        };
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.citySuggestions = [...action.payload.data];
      })
      .addCase(fetchPictures.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.map((trip) =>
          trip.city === action.payload.city
            ? action.payload.picture
              ? { ...trip, picture: action.payload.picture }
              : {
                  ...trip,
                  picture: `${process.env.PUBLIC_URL}/city.jpeg`,
                }
            : trip
        );
      })
      .addCase(fetchWeatherForTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPictures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectTrip, addTrip, removeTrip } = tripSlice.actions;

export default tripSlice.reducer;
