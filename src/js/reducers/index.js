/*
    Imports
*/

import { 
    FETCH_ALL_EVENT, 
    UPDATE_ASSIGN_ITEMS_CHECKLIST,
    RERENDER_PAGE,
    TOGGLE_DELETE_CONFIRMATION_MODAL
} from "../constants/action-types.js"; // Components

/*
    Initial State

    Additional Notes:
        - 'events' will contain the whole events object
*/
const initialState = {
    events: null,
    selectedAssignedItems: {
        selectedItems: [],
        selectedAttendee: []
    },
    shouldReRenderPage: false,
    isDeleteCofirmationModalOpen: true,
    targetEvent: null
};


/*
    Root Reducer
*/
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_EVENT:
            return { ...state, events: action.payload };
        case UPDATE_ASSIGN_ITEMS_CHECKLIST:
            return { ...state, selectedAssignedItems: action.payload };
        case RERENDER_PAGE:
            return { ...state, shouldReRenderPage: action.payload };
        case TOGGLE_DELETE_CONFIRMATION_MODAL:
            return { ...state, isDeleteCofirmationModalOpen: action.payload.bool, targetEvent: action.payload.event };
        default:
            return state;
    }
};

export default rootReducer;