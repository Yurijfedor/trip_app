import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const rapidApiKey = process.env.REACT_APP_RAPIDAPI_API_KEY;
const pixabayApiKey = process.env.REACT_APP_PIXABAY_API_KEY;

export const fetchWeatherForTrip = createAsyncThunk(
  "trip/fetchWeather",
  async ({ city, startDate, endDate }) => {
    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json&iconSet=icons1`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      return city;
    }
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  "trip/fetchCurrentWeather",
  async (city) => {
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
    );
    return response.data;
  }
);

export const fetchCitySuggestions = createAsyncThunk(
  "city/fetchCitySuggestion",
  async (searchTerm) => {
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: { namePrefix: searchTerm, limit: 5, offset: 0 },
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  }
);

export const fetchPictures = createAsyncThunk(
  "trip/fetchPicture",
  async (city) => {
    try {
      const BASE_URL = "https://pixabay.com/api/";
      const API_KEY = pixabayApiKey;
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
