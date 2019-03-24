import {
    CHANGE_GREETING,
    TOGGLE_EVENT_CARD_CONTAINER
} from "./../constants/action-types.js";

export const changeGreeting = message => ({
    type: CHANGE_GREETING,
    payload: message
});

export const toggleEventCardContainer = bool => ({
    type: TOGGLE_EVENT_CARD_CONTAINER,
    payload: bool
});