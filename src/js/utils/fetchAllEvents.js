/*
      fetchAllEvents

      Description: retrieve the events

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants

export function fecthAllEvents() {

    return fetch(`${REST_API_BASE_PATH}/events/`)
        .then(res => res.json())
        .then(events => events)

}