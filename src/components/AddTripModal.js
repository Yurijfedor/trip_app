import React, { useState } from "react";

const AddTripModal = ({ onSave }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return <div className="modal"></div>;
};

export default AddTripModal;
