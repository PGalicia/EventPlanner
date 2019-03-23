import React, { Component } from "react";
import { Link } from "react-router-dom";

// .scss
import "./../../../scss/home.scss";

// redux
import { connect } from "react-redux";

// Components

import EventCard from "./../presentational/eventCard.jsx";

/*
  mapStateToProps, mapDispatchToProps
*/
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

/*
  main component
*/
class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <h1>Home Component</h1>
          {/* Add Button */}
          <div><Link to={'/create_new_event'}>Add</Link></div>
          {/* Current Event */}
          <h3 className="event-titles">Current Event</h3>
          <EventCard />
          {/* Future Event */}
          <h3 className="event-titles">Future Event</h3>
          {/* Past Event */}
          <h3 className="event-titles">Past Event</h3>
          <h3><Link to={'/events/1'}>Event 1</Link></h3>
          <h6><Link to={'/edit/1'}>Edit Event 1</Link></h6>
          <h3><Link to={'/events/2'}>Event 2</Link></h3>
          <h6><Link to={'/edit/2'}>Edit Event 2</Link></h6>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
