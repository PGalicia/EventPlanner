import {
    CHANGE_GREETING
} from "../constants/action-types.js";

const initialState = {
    message: "Hello World"
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_GREETING:
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default rootReducer;