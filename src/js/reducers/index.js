import {
    CHANGE_GREETING,
    FETCH_ALL_EVENT
} from "../constants/action-types.js";

const initialState = {
    message: "Hello World",
    events: null
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_GREETING:
            return { ...state, message: action.payload };
        case FETCH_ALL_EVENT:
            return { ...state, events: action.payload };
        default:
            return state;
    }
};

export default rootReducer;