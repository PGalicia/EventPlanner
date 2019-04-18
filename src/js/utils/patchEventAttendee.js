/*
      patchEventAttendee

      Description: edit the main information for an event (name, location, datetime)

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants

export function patchEventAttendee(eventId, guestId, isGoing) {

    return fetch(`${REST_API_BASE_PATH}/guests/${eventId}/${guestId}/${isGoing}`, {
        method: "PATCH"
    })

}