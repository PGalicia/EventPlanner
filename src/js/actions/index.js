/*
    Imports
*/

// Constants
import {
    FETCH_ALL_EVENT,
    UPDATE_ASSIGN_ITEMS_CHECKLIST,
    RERENDER_PAGE,
    TOGGLE_DELETE_CONFIRMATION_MODAL
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

export const rerenderPage = bool => ({
    type: RERENDER_PAGE,
    payload: bool
});

export const toggleDeleteConfirmationModal = bool => ({
    type: TOGGLE_DELETE_CONFIRMATION_MODAL,
    payload: bool
});

