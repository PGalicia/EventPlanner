/*
      fetchAllEvents

      Description: retrieve the events

      Additional Notes:
        - Ensure that the return type is a PROMISE
*/

import { REST_API_BASE_PATH } from "./../constants/restAPIBasePath.js" // Constants
import events from "../_database/events.js"; // Pseudo Database

export function fetchAllEvents(id = "") {

    // Fetch 
    return id === "" ? Promise.resolve(events) : Promise.resolve(events.find(event => event.rowid == id))

    // return fetch(`${REST_API_BASE_PATH}/events/${id}`)
    //     .then(res => res.json())
    //     .then(events => events)

}