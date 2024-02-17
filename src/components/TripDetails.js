import React, { useState, useEffect } from "react";

const TripDetails = ({ trip }) => {
  const [forecast, setForecast] = useState(null);
  const [countdown, setCountdown] = useState("");


  return (
    <div>
      <h2>Weather Forecast for {trip.city}</h2>
      
      <h3>Countdown to Trip: {countdown}</h3>
    </div>
  );
};

export default TripDetails;
