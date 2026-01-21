Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default
      Given I open the app
      When I view the list of events
      Then each event's details should be hidden
    
    Scenario: User can expand an event to see details
      Given an event is collapsed
      When I click on the event
      Then the event details should expand and become visible
    
    Scenario: User can collapse an event to hide details
      Given an event is expanded
      When I click on the event
      Then the event details should collapse and become hidden