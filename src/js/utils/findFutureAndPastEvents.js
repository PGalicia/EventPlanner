/*
      findFutureAndPastEvents

      Description: Takes in the currentEvent and list of events,
        and return an object that holds which events are future and
        past events.
      
      Additional Information:
        - 'events' parameter needs to be sorted
*/

export function findFutureAndPastEvents(currentEvent, events) {

    // Initial the will be returned object
    let result = {
        futureEvents: [],
        pastEvents: []
    }

    // If there is no current event, set the pastEvents to events
    if(currentEvent === null) {
        result.pastEvents = events;
        return result;
    }
  
    // Find currentEvent id
    const currentEventIndex = events.indexOf(currentEvent);
  
    // If the currentEventIndex equals the last element of the event list,
    //    Set futureEvents to equal everything in the events besides the last one
    // Else if the currentEventIndex equals the first element of the event list,
    //    Set the pastEvents to equal everything in the events besides the first one
    // Else (when currentEventIndex is located in the middle of the events),
    //    Set the pastEvents to equal every event after currentEvent
    //    Set the futureEvents to equal every event before currentEvent
    if(currentEventIndex === (events.length - 1)) {
        result.futureEvents = events.slice(0, currentEventIndex);
    } else if(currentEventIndex === 0) {
      result.pastEvents = events.slice(1);
    } else {
      result.futureEvents = events.slice(0, currentEventIndex);
      result.pastEvents = events.slice(currentEventIndex + 1);
    }

    return result;
}