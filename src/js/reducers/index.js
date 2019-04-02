/*
    Imports
*/

import { 
    FETCH_ALL_EVENT, 
    UPDATE_ASSIGN_ITEMS_CHECKLIST,
    RELOAD_PAGE
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
    shouldReloadPage: false
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
        case RELOAD_PAGE:
            return { ...state, shouldReloadPage: action.payload };
        default:
            return state;
    }
};

export default rootReducer;