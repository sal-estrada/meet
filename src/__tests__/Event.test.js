import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let event;
  let EventComponent;

  beforeEach(() => {
    event = mockData[0]; // sample event
    EventComponent = render(<Event event={event} />);
  });

  // --- Scenario 1: collapsed by default ---
  test("Scenario 1: Event details are collapsed by default", () => {
    const details = EventComponent.queryByText(new RegExp(event.description.substring(0, 30), 'i'));

    // Description should NOT be in DOM initially
    expect(details).not.toBeInTheDocument();

    // Button should say "show details"
    const button = EventComponent.queryByText("show details");
    expect(button).toBeInTheDocument();
  });

  // --- Scenario 2: user expands event ---
  test("Scenario 2: User can expand the event to see details", () => {
    const button = EventComponent.getByText("show details");
    fireEvent.click(button);

    const details = EventComponent.queryByText(new RegExp(event.description.substring(0, 30), 'i'));

    // Description should now be visible
    expect(details).toBeInTheDocument();

    // Button should change label
    expect(EventComponent.getByText("hide details")).toBeInTheDocument();
  });

  // --- Scenario 3: user collapses event ---
  test("Scenario 3: User can collapse an event to hide details", () => {
    const button = EventComponent.getByText("show details");
    
    // First click to expand
    fireEvent.click(button);

    // Second click to collapse
    fireEvent.click(EventComponent.getByText("hide details"));

    const details = EventComponent.queryByText(new RegExp(event.description.substring(0, 30), 'i'));

    // Description should disappear again
    expect(details).not.toBeInTheDocument();

    // Button should revert
    expect(EventComponent.getByText("show details")).toBeInTheDocument();
  });
});


