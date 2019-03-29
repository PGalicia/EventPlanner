/*
    Imports
*/

// Constants
import {
    FETCH_ALL_EVENT
} from "./../constants/action-types.js";

/*
    Actions
*/
export const fetchAllEvents = events => ({
    type: FETCH_ALL_EVENT,
    payload: events
});