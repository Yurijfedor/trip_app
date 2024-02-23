import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherForTrip = createAsyncThunk(
  "trip/fetchWeather",
  async ({ city, startDate, endDate }) => {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=74M3LM9R9KVSRGJ6K65SKJJ9A&contentType=json&iconSet=icons1`
    );
    return response.data;
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  "trip/fetchCurrentWeather",
  async (city) => {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=74M3LM9R9KVSRGJ6K65SKJJ9A&contentType=json`
    );
    return response.data;
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "city/fetchCitySuggestion",
  async (searchTerm) => {
    const response = await axios.get(
      `http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=5&offset=0&namePrefix=${searchTerm}`
    );

    return response.data;
  }
);

export const fetchPictures = createAsyncThunk(
  "trip/fetchPicture",
  async (city) => {
    try {
      const BASE_URL = "https://pixabay.com/api/";
      const API_KEY = "29711161-732b17ef7029dbffa0827fda9";
      const options = new URLSearchParams({
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "false",
        per_page: 3,
        key: API_KEY,
        q: city,
      });

      const response = await axios.get(`${BASE_URL}?${options}`);
      const picture = response.data.hits[0]?.webformatURL;
      return { picture, city };
    } catch (error) {
      console.log(error.message);
    }
  }
);
