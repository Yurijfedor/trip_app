import { createSlice } from "@reduxjs/toolkit";
import { fetchCitySuggestions } from "./operations";

const citySlice = createSlice({
  name: "city",
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitySuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchCitySuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.suggestions = [];
      });
  },
});

export default citySlice.reducer;
