import {
    CHANGE_GREETING
} from "./../constants/action-types.js";

export const changeGreeting = message => ({
    type: CHANGE_GREETING,
    payload: message
});