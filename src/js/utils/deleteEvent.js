/*
      deleteEvent

      Description: delete the selected event

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants

export function deleteEvent(eventId) {

    return fetch(`${REST_API_BASE_PATH }/events/${eventId}`, {
        method: "DELETE"
    });

}