import { createSelector } from "@reduxjs/toolkit";

export const selectTrips = (state) => state.trip.trips;
export const selectSelectedTrip = (state) => state.trip.selectedTrip;
export const selectSearshTerm = (state) => state.filter.searchTerm;
export const selectUser = (state) => state.user;
export const selectIsLoading = (state) => state.trip.loading;
export const selectError = (state) => state.trip.error;

export const selectVisibleTrips = createSelector(
  [selectTrips, selectSearshTerm],
  (trips, filter) => {
    return trips
      .filter((trip) => {
        const { city, startDate, endDate } = trip;
        const search = filter.trim().toLowerCase();
        return (
          city.toLowerCase().includes(search) ||
          startDate.toString().includes(search) ||
          endDate.toString().includes(search)
        );
      })
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }
);
