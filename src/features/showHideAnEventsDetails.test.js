import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  // ------------------------------------------------
  // Scenario 1: Event details are hidden by default
  // ------------------------------------------------
test('An event element is collapsed by default', ({ given, when, then }) => {
  let AppComponent;

  given('I open the app', () => {
    AppComponent = render(<App />);
  });

  when('I view the list of events', async () => {
    await waitFor(() => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const eventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(eventItems.length).toBeGreaterThan(0);
    });
  });

  then("each event's details should be hidden", async () => {
    await waitFor(() => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const eventItems = within(EventListDOM).queryAllByRole('listitem');

      eventItems.forEach(event => {
        const details = within(event).queryByText(/hide details/i);
        expect(details).not.toBeInTheDocument();
      });
    });
  });
});


  // ------------------------------------------------
  // Scenario 2: User expands event details
  // ------------------------------------------------
test('User can expand an event to see details', ({ given, when, then }) => {
  let AppComponent;
  let eventItem;
  let toggleButton;

  given('an event is collapsed', async () => {
    AppComponent = render(<App />);

    await waitFor(() => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const items = within(EventListDOM).queryAllByRole('listitem');
      expect(items.length).toBeGreaterThan(0);

      eventItem = items[0];
      toggleButton = within(eventItem).getByText(/show details/i);
    });
  });

  when('I click on the event', async () => {
    const user = userEvent.setup();
    await user.click(toggleButton);
  });

  then('the event details should expand and become visible', async () => {
    await waitFor(() => {
      const details = within(eventItem).getByText(/hide details/i);
      expect(details).toBeInTheDocument();
    });
  });
});

  // ------------------------------------------------
  // Scenario 3: User collapses event details
  // ------------------------------------------------
test('User can collapse an event to hide details', ({ given, when, then }) => {
  let AppComponent;
  let eventItem;

  given('an event is expanded', async () => {
    AppComponent = render(<App />);

    await waitFor(async () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const items = within(EventListDOM).queryAllByRole('listitem');
      expect(items.length).toBeGreaterThan(0);

      eventItem = items[0];
      const toggleButton = within(eventItem).getByText(/show details/i);

      const user = userEvent.setup();
      await user.click(toggleButton);
    });
  });

  when('I click on the event', async () => {
    const user = userEvent.setup();
    await user.click(within(eventItem).getByText(/hide details/i));
  });

  then('the event details should collapse and become hidden', async () => {
    await waitFor(() => {
      const details = within(eventItem).queryByText(/hide details/i);
      expect(details).not.toBeInTheDocument();
    });
  });
});
});