import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPictures,
  fetchWeatherForTrip,
  fetchCurrentWeather,
} from "../redux/operations";
import {
  selectTrips,
  selectSelectedTrip,
  selectVisibleTrips,
  selectUser,
} from "../redux/selectors";
import { selectTrip } from "../redux/tripSlice";
import { convertDateToEuropean } from "../utils/dateUtils";

const TripList = ({ openDeleteModal }) => {
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const trips = useSelector(selectTrips);
  const selectedTrip = useSelector(selectSelectedTrip);
  const visibleTrips = useSelector(selectVisibleTrips);

  useEffect(() => {
    trips.forEach((trip) => {
      if (!trip.picture) {
        dispatch(fetchPictures(trip.city));
      }
      if (!trip.forecast) {
        dispatch(
          fetchWeatherForTrip({
            city: trip.city,
            startDate: trip.startDate,
            endDate: trip.endDate,
          })
        );
      }
    });
  }, [dispatch, trips]);

  const tripCardHeight = 205;

  const scrollByThreeItems = (direction) => {
    if (listRef.current) {
      // Check that the ref is not null
      const scrollAmount = tripCardHeight * 3 * direction;
      listRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    } else {
      console.error("The list container has not mounted yet.");
    }
  };

  return trips.length === 0 ? (
    <h2>{"You have deleted all trips! Please add new trips!"}</h2>
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="button-container button-container-scroll">
        <button
          className="button-scroll"
          onClick={() => scrollByThreeItems(-1)}
        >
          Up
        </button>
        <button className="button-scroll" onClick={() => scrollByThreeItems(1)}>
          Down
        </button>
      </div>

      <ul ref={listRef} className="trip-list">
        {visibleTrips.map((trip) => (
          <li className="trip-item" key={trip.id}>
            <button
              className="delete-button"
              onClick={() => {
                dispatch(selectTrip(trip));
                openDeleteModal();
              }}
            >
              X
            </button>
            <div
              className="trip-card"
              onClick={() => {
                dispatch(selectTrip(trip));
                dispatch(fetchCurrentWeather(trip.city));
              }}
              style={{
                borderColor:
                  selectedTrip && selectedTrip.id === trip.id
                    ? "lightblue"
                    : "inherit",
              }}
            >
              <img className="trip-image" src={trip.picture} alt={trip.city} />
              <div className="trip-wrap">
                <h3 className="trip-city">{trip.city}</h3>
                <p className="trip-schedule">
                  {convertDateToEuropean(trip.startDate)} -{" "}
                  {convertDateToEuropean(trip.endDate)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
