Feature: Specify number of events
 Scenario: Show 32 events by default when user hasn’t specified a number
  Given I open the app
  When I do not set the number of events to display
  Then 32 events should be displayed by default

 Scenario: User can change the number of events displayed
  Given I am viewing the list of events
  When I specify a new number of events to display
  Then only that number of events should be shown