import React from "react";

const trips = [
  { id: 1, city: "London", startDate: "2024-03-01", endDate: "2024-03-05" },
];

const TripList = ({ onSelectTrip }) => {
  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <div key={trip.id} onClick={() => onSelectTrip(trip)}>
          {trip.city} ({trip.startDate} - {trip.endDate})
        </div>
      ))}
    </div>
  );
};

export default TripList;
