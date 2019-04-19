/*
    Imports
*/

// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";

// Components
import App from "./js/components/container/app.jsx";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./js/reducers/index.js"

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);