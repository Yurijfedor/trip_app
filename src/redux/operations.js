import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherForTrip = createAsyncThunk(
  "trip/fetchWeather",
  async (tripId, { getState }) => {
    const trip = getState().trip.trips.find((t) => t.id === tripId);
    if (!trip) throw new Error("Trip not found");
    const response = await fetch(
      `https://weatherapi.example.com/forecast?city=${trip.city}&apiKey=YOUR_API_KEY`
    );
    const weather = await response.json();
    return { id: tripId, weather };
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "city/fetchCitySuggestions",
  async (searchTerm) => {
    const response = await fetch(
      `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${searchTerm}&limit=5&offset=0`
    );
    const data = await response.json();
    return data.data;
  }
);
