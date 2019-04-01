/*
    Imports
*/

// Constants
import {
    FETCH_ALL_EVENT,
    UPDATE_ASSIGN_ITEMS_CHECKLIST
} from "./../constants/action-types.js";

/*
    Actions
*/
export const fetchAllEvents = events => ({
    type: FETCH_ALL_EVENT,
    payload: events
});

export const updateAssignItemsChecklist = checklist => ({
    type: UPDATE_ASSIGN_ITEMS_CHECKLIST,
    payload: checklist
});