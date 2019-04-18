/*
  Imports    
*/
import React, { Component } from "react"; // React
import { rerenderPage } from "./../../actions/index.js"; // State Actions
import { sortDate } from "./../../utils/sortDate.js"; // Utility Function
import { findCurrentEvent } from "./../../utils/findCurrentEvent.js"; // Utility Function
import { findFutureAndPastEvents } from "./../../utils/findFutureAndPastEvents.js"; // Utility Functions
import { fecthAllEvents } from "./../../utils/fetchAllEvents.js"; // Utility Functions
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
  }

  componentDidMount() {
    // Fetch all the events
    fecthAllEvents().then()
    .then(events => {

      // Sort the event based on their date
      const sortedEvents = sortDate(events);

      // Find the current event
      const currentEvent = findCurrentEvent(sortedEvents);

      // Find the current and past events
      const futureAndPastEvents = findFutureAndPastEvents(currentEvent, sortedEvents);
      this.setState({
        currentEvent,
        futureEvents: futureAndPastEvents.futureEvents,
        pastEvents: futureAndPastEvents.pastEvents
      });
    })

  }

  componentDidUpdate() {

    // Rerenders the page during a link Redirect
    if(this.props.shouldReRenderPage) {
        
        this.props.rerenderPage(false);
        window.location.reload();
    }
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
