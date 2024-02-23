import React, { useState, useEffect } from "react";
import { calculateCountdown } from "../utils/dateUtils";

const CountdownTimer = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(startTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateCountdown(startTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <div className="countdown">
      <div className="countdown-item">
        <p>{timeLeft.days}</p>
        <span>Days</span>
      </div>
      <div className="countdown-item">
        <p>{timeLeft.hours}</p>
        <span>Hours</span>
      </div>
      <div className="countdown-item">
        <p>{timeLeft.minutes}</p>
        <span>Minutes</span>
      </div>
      <div className="countdown-item">
        <p>{timeLeft.seconds}</p>
        <span>Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
