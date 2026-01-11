//src/__tests__/App.test.js
import React from "react";
import "@testing-library/jest-dom";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("render list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

test("user can change the number of events displayed", async () => {
  const user = userEvent.setup();
  const AppComponent = render(<App />);
  const AppDOM = AppComponent.container.firstChild;

  // Find NumberOfEvents input
  const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
  const NumberInput = within(NumberOfEventsDOM).getByRole("spinbutton");

  // Clear default 32 and type 10
  await user.type(NumberInput, "{backspace}{backspace}10");

  // Wait for event list to update
  const EventListDOM = AppDOM.querySelector("#event-list");

  await waitFor(() => {
    const EventListItems = within(EventListDOM).queryAllByRole("listitem");
    expect(EventListItems.length).toBe(10);
  });
});
});
