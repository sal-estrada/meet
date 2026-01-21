import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  // --- Feature 1: Show 32 events by default ---
  test('Show 32 events by default when user hasn’t specified a number', ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;

    given('I open the app', () => {
      AppComponent = render(<App />);
    });

    when('I do not set the number of events to display', () => {
      // Nothing needs to be done here for the default case
    });

then(/^(\d+) events should be displayed by default$/, async (arg0) => {
  const expectedCount = Number(arg0);

  await waitFor(() => {
    const EventListDOM = AppComponent.container.querySelector('#event-list');
    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
    expect(EventListItems.length).toBe(expectedCount);
  });
});

  // --- Feature 2: User can change the number of events ---
  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;
    let NumberOfEventsInput;

    given('I am viewing the list of events', () => {
      AppComponent = render(<App />);
      EventListDOM = AppComponent.container.querySelector('#event-list');
      NumberOfEventsInput = AppComponent.container.querySelector('#number-input');
    });

    when('I specify a new number of events to display', async () => {
      const user = userEvent.setup();
      // Clear default value 32 and type 10
      await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
    });

    then('only that number of events should be shown', async () => {
      // Wait for re-render (if necessary)
      const eventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(eventItems.length).toBe(10);
    });
  });
});
});