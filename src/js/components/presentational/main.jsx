import React from "react";
import { Switch, Route } from "react-router-dom";
import "./../../../scss/main.scss";

// Container Component
import Home from "./../container/home.jsx";
import CreateNewEvent from "./../container/createNewEvent.jsx";
import ViewEvent from "./../container/viewEvent.jsx";
import EditEvent from "./../container/editEvent.jsx";

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create_new_event" component={CreateNewEvent} />
      <Route path="/events/:eventId" component={ViewEvent} />
      <Route path="/edit/:eventId" component={EditEvent} />
      {/* 03/22/19: CONTINUE WORKING ON ADDING ROUTES. SPECIFICALLY 'ASSIGN ITEM' ROUTES */}
      {/* <Route path="/:eventId" component={ViewEvent}/> */}
      {/* <Route exact path="/:eventId/edit" component={EditEvent}/> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </main>
);

export default Main;