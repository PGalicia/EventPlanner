/*
    Imports
*/

import { FETCH_ALL_EVENT } from "../constants/action-types.js"; // Components

/*
    Initial State

    Additional Notes:
        - 'events' will contain the whole events object
*/
const initialState = {
    events: null
};


/*
    Root Reducer
*/
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_EVENT:
            return { ...state, events: action.payload };
        default:
            return state;
    }
};

export default rootReducer;