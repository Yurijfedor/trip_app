import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWeatherForTrip,
  fetchPictures,
  fetchCurrentWeather,
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
      .addCase(fetchPictures.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.trips = state.trips.map((trip) =>
          trip.city === action.payload.city
            ? action.payload.picture
              ? { ...trip, picture: action.payload.picture }
              : {
                  ...trip,
                  picture:
                    "https://pixabay.com/get/gf611a0bbb493ef03f2d27f297bd1a8fef479c6c0c5d2e8aeb7705a341f37c6ff8af92e6ee264a1191842807486fa9e575721d06f12d17ff004215f0611f23417_640.jpg",
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
