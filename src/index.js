import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./js/components/container/app.jsx";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./js/reducers/index.js"

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);