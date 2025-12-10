// Event.js
import React, { useState } from "react";

const Event = ({ event }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <li className="event">
      <h3>{event.summary}</h3>
      <p>{event.location}</p>
      <p>{event.created}</p>

      {collapsed ? null : (
        <div className="details">
          <p>{event.description}</p>
        </div>
      )}

      <button
        className="details-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "show details" : "hide details"}
      </button>
    </li>
  );
};

export default Event;
