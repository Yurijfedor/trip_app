import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherForTrip } from "./operations";

const initialState = {
  trips: [],
  selectedTrip: null,
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    selectTrip(state, action) {
      state.selectedTrip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.map((trip) =>
          trip.id === action.payload.id
            ? { ...trip, weather: action.payload.weather }
            : trip
        );
      })
      .addCase(fetchWeatherForTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectTrip } = tripSlice.actions;

export default tripSlice.reducer;
