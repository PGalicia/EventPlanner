/*
    Imports
*/

import React from "react"; // React
import { Switch, Route } from "react-router-dom"; // React-Router
import "./../../../scss/main.scss"; // SCSS
import Home from "./../container/home.jsx"; // Component
import CreateNewEvent from "./../container/createNewEvent.jsx"; // Component
import ViewEvent from "./../container/viewEvent.jsx"; // Component
import EditEvent from "./../container/editEvent.jsx"; // Component

/*
    Main Component
*/

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create_new_event" component={CreateNewEvent} />
      <Route path="/events/:eventId" component={ViewEvent} />
      <Route path="/edit/:eventId" component={EditEvent} />
    </Switch>
  </main>
);

export default Main;