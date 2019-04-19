/*
      fetchAllEvents

      Description: retrieve the events

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants

export function fetchAllEvents(id = "") {

    return fetch(`${REST_API_BASE_PATH}/events/${id}`)
        .then(res => res.json())
        .then(events => events)

}