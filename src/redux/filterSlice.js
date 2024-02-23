import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = "";

const filtersSlice = createSlice({
  name: "filter",
  initialState: { searchTerm: filterInitialState },
  reducers: {
    setFilter(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
