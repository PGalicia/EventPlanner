/*
      findCurrentEvent

      Description: Takes in the 'events', and return which of the
        events are considered current from today's date

      Conditions:
        - The 'events' passed should have the length of at least 1
      
      Additional Information:
        - 'events' parameter needs to be sorted
        - There will be no event that will have the same datetime
*/

export function findCurrentEvent(events) {
    // Today's Date
    const todaysDate = new Date(Date.now());

    // Compare the first value (Initial Test)
    let bestDateScore = new Date(events[0].datetime) - todaysDate;

    // Will hold the current event
    let currentEvent = bestDateScore < 0 ? null : events[0];

    // If there is only one item on events list, return already
    if(events.length < 2) {
        return currentEvent;
    }


    for(let i = 1; i < events.length; i++) {

        // The variable holds the current date score when compared to todaysDate
        let currentDateScore = new Date(events[i].datetime) - todaysDate;

        // If currentDateScore is greater than the bestDateScore
        //      Skip the iteration
        // Else if currentDateScore is less than bestDateScore AND currentDateScore is greater than 0
        //      Set bestDateScore to the currentDateScore
        //      Set the currentEvent to the event in this iteration
        // Else (if currentDateScore is less than 0)
        //      Return currentEvent
        if(currentDateScore > bestDateScore) {
            continue;
        } else if(currentDateScore < bestDateScore && currentDateScore > 0) {
            bestDateScore = currentDateScore;
            currentEvent = events[i];
        } else {
            return currentEvent
        }
    }
}