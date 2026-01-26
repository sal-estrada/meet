import React, { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("")
    } else {
      setWarningAlert("You are currently offline. Data may not be accurate.")
    }

    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    console.log("All events received:", allEvents);
    console.log("Number of events:", allEvents?.length);

    if (!allEvents || allEvents.length === 0) {
      console.log("No events returned from getEvents()");
      setEvents([]);
      setAllLocations([]);
      return;
    }

    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);

    console.log("Filtered events:", filteredEvents);
    console.log("Current city:", currentCity);
    console.log("Current NOE:", currentNOE);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        onNumberChange={setCurrentNOE}
        setErrorAlert={setErrorAlert}
        setWarningAlert={setWarningAlert}
      />
      <EventList events={events} />
    </div>
  );
};

export default App;

// Make sure to check connections between the different components, works locally but not on launch.
