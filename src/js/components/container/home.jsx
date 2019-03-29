/*
  Imports    
*/
import React, { Component } from "react"; // React
import { Link } from "react-router-dom"; // React-Router
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { fetchAllEvents } from "./../../actions/index.js"; // State Actions
import { sortDate } from "./../../utils/sortDate.js"; // Utility Function
import { findCurrentEvent } from "./../../utils/findCurrentEvent.js" // Utility Function
import { findFutureAndPastEvents } from "./../../utils/findFutureAndPastEvents.js" // Utility Functions
import "./../../../scss/home.scss"; // SCSS
import { connect } from "react-redux"; // Redux
import EventCard from "./../presentational/eventCard.jsx"; // Component
import Header from "../presentational/header.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllEvents: events => dispatch(fetchAllEvents(events))
  };
};

/*
  Home component
*/
class Home extends Component {
  constructor() {
    super();

    this.state = {
      todayDate: new Date(Date.now()),
      currentEvent: null,
      futureEvents: [],
      pastEvents: []
    }
  }

  componentDidMount() {
    // Fetch all the events
    fetch(`${REST_API_BASE_PATH}/events/`)
    .then(res => res.json())
    .then(events => {

      // Sort the event based on their date
      const sortedEvents = sortDate(events);

      // Set the events to the state --- possibly useless
      this.props.fetchAllEvents(sortedEvents);

      // Find the current event
      const currentEvent = findCurrentEvent(sortedEvents);
      this.setState({ currentEvent })

      // Find the current and past events
      const futureAndPastEvents = findFutureAndPastEvents(currentEvent, sortedEvents);
      this.setState({ futureEvents: futureAndPastEvents.futureEvents });
      this.setState({ pastEvents: futureAndPastEvents.pastEvents });
    })

  }

  render() {
    return (
      <>
          {/* Header Component */}
          <Header />
          {/* Current Event */}
          {this.state.currentEvent &&
            <>
              <h3 className="event-titles">Current Event</h3>
              <EventCard 
                isEventCardContainerExpanded={true}
                event={this.state.currentEvent}
              />
            </>
          }
          {/* Future Events */}
          {this.state.futureEvents.length > 0 &&
            <>
              <h3 className="event-titles">Future Event</h3>
              {this.state.futureEvents.map(event => {
                return (
                  <EventCard 
                    key={event.rowid}
                    isEventCardContainerExpanded={false}
                    event={event}
                  />
                );
              })}
              
            </>
          }
          {}
          {/* Past Events */}
          {this.state.pastEvents.length > 0 &&
            <>
              <h3 className="event-titles">Past Event</h3>
              {this.state.pastEvents.map(event => {
                return (
                  <EventCard 
                    key={event.rowid}
                    isEventCardContainerExpanded={false}
                    event={event}
                  />
                );
              })}
            </>
          }
          
          {/* <h3><Link to={'/events/1'}>Event 1</Link></h3>
          <h6><Link to={'/edit/1'}>Edit Event 1</Link></h6>
          <h3><Link to={'/events/2'}>Event 2</Link></h3>
          <h6><Link to={'/edit/2'}>Edit Event 2</Link></h6> */}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
