import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedTrip, selectUser } from "../redux/selectors";
import { getDayOfWeek, generateDateRange } from "../utils/dateUtils";
import CountdownTimer from "./CountdownTimer ";

const TripDetails = () => {
  const selectedTrip = useSelector(selectSelectedTrip);
  const user = useSelector(selectUser);

  return (
    <div className="trip-details">
      <img
        src={user.photo ? user.photo : "../assets/avatar.png"}
        alt="User Avatar"
        className="user-avatar"
      />
      <h2>{getDayOfWeek(generateDateRange().startDate)}</h2>
      {typeof selectedTrip.forecast !== "string" ? (
        <div className="weather-icon-and-temp">
          <img
            className="trip-weather-icon"
            src={`${process.env.PUBLIC_URL}/weatherIcons/png/set_color/${selectedTrip.currentWeather.days[0].icon}.png`}
            alt={selectedTrip.currentWeather.days[0].icon}
          />
          <p className="trip-temperature">
            {Math.round(selectedTrip.currentWeather.days[0].temp)}
            <sup style={{ fontSize: "16px" }}>°C</sup>
          </p>
        </div>
      ) : (
        ""
      )}
      <h3 className="trip-detail-city">{selectedTrip.city}</h3>
      <div className="countdown">
        <CountdownTimer startTime={`${selectedTrip.startDate}T23:59:59`} />
      </div>
    </div>
  );
};

export default TripDetails;
