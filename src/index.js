import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./js/components/container/app.jsx";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./js/reducers/index.js"

/* 
    TEST COMPONENTS 
        ensure to delete the whole thing for the final
        draft
*/
import DropdownButton from "./js/components/test/dropdownButtonTEST.jsx"

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            {/* <DropdownButton /> */}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);