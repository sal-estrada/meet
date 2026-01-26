// src/components/NumberOfEvents.jsx
import React, { useState } from "react";

const NumberOfEvents = ({ onNumberChange, setErrorAlert }) => {
  // Default number of events
  const [numEvents, setNumEvents] = useState(32);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    setNumEvents(value);
    if (onNumberChange) onNumberChange(value);

    let errorText;
    if (value <= 0 || isNaN()) {
      errorText = "Please, input a number greater than 0."
    } else {errorText = ""}
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events:</label>
      <input
        id="number-input"
        type="number"
        value={numEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;