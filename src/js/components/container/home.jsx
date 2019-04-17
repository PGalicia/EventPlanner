/*
  Imports    
*/
import React, { Component } from "react"; // React
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { fetchAllEvents, rerenderPage } from "./../../actions/index.js"; // State Actions
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
    events: state.events,
    shouldReRenderPage: state.shouldReRenderPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllEvents: events => dispatch(fetchAllEvents(events)),
    rerenderPage: bool => dispatch(rerenderPage(bool))
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

    this.fetchInformation = this.fetchInformation.bind(this);
  }

  componentDidMount() {
    this.fetchInformation();

  }

  componentDidUpdate() {

    // Rerenders the page during a link Redirect
    if(this.props.shouldReRenderPage) {
        
        this.props.rerenderPage(false);
        window.location.reload();
    }
  }

  fetchInformation() {
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
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
