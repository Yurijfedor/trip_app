import React from "react";
import { useSelector } from "react-redux";
import { getDayOfWeek } from "../utils/dateUtils";
import { selectSelectedTrip } from "../redux/selectors";

const ForecastList = () => {
  const selectedTrip = useSelector(selectSelectedTrip);

  return typeof selectedTrip.forecast === "string" ? (
    <h2>{selectedTrip.forecast}</h2>
  ) : (
    <div style={{ flex: 1 }}>
      <h2 style={{ marginBottom: "50px", display: "block" }}>Week</h2>
      <ul className="forecast-list">
        {selectedTrip.forecast.days.map((day) => (
          <li key={day.datetime} className="forecast-item">
            <div style={{ marginBottom: "15px" }}>
              {getDayOfWeek(day.datetime)}
            </div>
            <img
              style={{ marginBottom: "15px" }}
              src={`${process.env.PUBLIC_URL}/weatherIcons/png/set_color/${day.icon}.png`}
              alt={day.icon}
            />
            <p>
              {Math.round(day.tempmax)}°/{Math.round(day.tempmin)}°
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastList;
