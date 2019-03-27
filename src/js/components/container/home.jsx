import React, { Component } from "react";
import { Link } from "react-router-dom";
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js";
import {
  fetchAllEvents
} from "./../../actions/index.js";
import {
  sortDate
} from "./../../utils/sortDate.js";

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
  main component
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
      this.props.fetchAllEvents(sortedEvents);

      // Find the 'current' event
      // **TASK: install jest and write unit test for this
      // **TASK: make this a function under utils (make sure it return something)
      // **TASK: ensure that this actually works for edge cases
      let bestDateScore = new Date(sortedEvents[0].datetime) - this.state.todayDate;
      for(let i = 0; i < sortedEvents.length; i++) {
        // If it's 0 or less than 0, exit the loop
        // Continue to compare
        // and constantly change the variable if the new date is lower than the old date
        let comparisonDateScore = new Date(sortedEvents[i].datetime) - this.state.todayDate;
        // console.log("Date Score:", comparisonDateScore);
        // console.log("Best Date Score:", bestDateScore);
        if(comparisonDateScore <= 0) {
          
          if(bestDateScore) {
            this.setState({ currentEvent: sortedEvents[i-1] });
          } else {
            this.setState({ currentEvent: null });
          }
          break;
        }
        if(comparisonDateScore < bestDateScore) {
          bestDateScore = comparisonDateScore;
        }
      }

      

      let targetIndex = sortedEvents.indexOf(this.state.currentEvent);
      for(let event of sortedEvents) {
        // Check event index
        let index = sortedEvents.indexOf(event);
        // if index is greater than the 'current' id, push it to futureevent
        if(index < targetIndex) {
          let futureEvents = this.state.futureEvents;
          futureEvents.push(event);
          this.setState({ futureEvents });
        }
        // if index is equal to the 'current' id, continue
        else if(index === targetIndex) {
          continue;
        }
        // if index is less than the 'current' id, push it to the pastevent
        else {
          let pastEvents = this.state.pastEvents;
          pastEvents.push(event);
          this.setState({ pastEvents });
        }

      }
    })

  }

  render() {
    return (
      <div>
          {/* Add Button */}
          <div><Link to={'/create_new_event'}>Add</Link></div>
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
          {/* Future Event */}
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
          {/* Past Event */}
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
