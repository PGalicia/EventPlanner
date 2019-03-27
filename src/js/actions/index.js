import {
    CHANGE_GREETING,
    FETCH_ALL_EVENT
} from "./../constants/action-types.js";

export const changeGreeting = message => ({
    type: CHANGE_GREETING,
    payload: message
});

export const fetchAllEvents = events => ({
    type: FETCH_ALL_EVENT,
    payload: events
});