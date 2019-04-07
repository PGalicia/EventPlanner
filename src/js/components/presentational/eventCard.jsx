/*
  Imports
*/

import React, { Component } from 'react'; // React
import './../../../scss/eventCard.scss'; // SCSS
import { connect } from "react-redux"; // Redux
import { convertNumToDays } from "./../../utils/convertNumToDays.js"; // Utility Function
import { convertNumToMonths } from "./../../utils/convertNumToMonths.js"; // Utility Function
import { formatEventTitle } from "./../../utils/formatEventTitle.js"; // Utility Function
import { Link, Redirect } from "react-router-dom"; // React-Router
import { toggleDeleteConfirmationModal } from "./../../actions/index.js"; // Action-Types

/*
  mapStateToProps,
  mapDispatchToProps
*/

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDeleteConfirmationModal: bool => dispatch(toggleDeleteConfirmationModal(bool))
    };
}

/*
  EventCard Component
*/

class EventCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEventCardContainerExpanded: this.props.isEventCardContainerExpanded,
            event: this.props.event,
            eventDateTime: new Date(this.props.event.datetime),
            toEventPage: false
        }


        // Bindings
        this.toggleEventCardExpansion = this.toggleEventCardExpansion.bind(this);
        this.linkToEventPage = this.linkToEventPage.bind(this);
        this.openDeleteConfirmationModal = this.openDeleteConfirmationModal.bind(this);
    }

    // Toggle Event Card Expansion
    toggleEventCardExpansion() {
        this.setState({ isEventCardContainerExpanded: !this.state.isEventCardContainerExpanded });
    }

    openDeleteConfirmationModal(e) {
        this.props.toggleDeleteConfirmationModal({bool: true, event: this.state.event});
    }

    linkToEventPage(e) {
        this.setState({ toEventPage: true });
    }
    
    render() {
        if(this.state.toEventPage) {
            return <Redirect to={`/edit/${this.state.event.rowid}`}/>
        }

        return (
            <div className={this.state.isEventCardContainerExpanded ? 
                                "event-card-container" : 
                                "event-card-container shrink"}
            >
                {/* Expanded Event Card Date Container */}
                {this.state.isEventCardContainerExpanded &&
                    <div className="date-container">
                        <h3 className="date">{this.state.eventDateTime.getDate()}</h3>
                        <h3 className="month">{convertNumToMonths(this.state.eventDateTime.getMonth()).substring(0,3).toUpperCase()}</h3>
                        <h4 className="day-year">{convertNumToDays(this.state.eventDateTime.getDay())} {this.state.eventDateTime.getFullYear()}</h4>
                    </div>
                }
                {/* Minified Event Card Date Container */}
                {!this.state.isEventCardContainerExpanded &&
                    <div className="date-container-small">
                        <h3 className="date-small">{convertNumToMonths(this.state.eventDateTime.getMonth()).substring(0,3).toUpperCase()} {this.state.eventDateTime.getDate()} <span>{this.state.eventDateTime.getFullYear()}</span></h3>
                    </div>
                }
                {/* Event Card Main Information Container */}
                <div className="event-info-container">
                    <h2 className="event-name">{formatEventTitle(this.state.event.name)}</h2>
                    {this.state.isEventCardContainerExpanded && 
                        <>
                            <h4 className="event-location">
                                <span className="logo" id="location">logo</span>
                                {this.state.event.location}
                            </h4>
                            <h4 className="event-time">
                                <span className="logo" id="time">logo</span>
                                {this.state.eventDateTime.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: '2-digit', minute:'2-digit' })}
                            </h4>
                            <h6 className="see-more-button"><Link to={`/events/${this.state.event.rowid}`}>See More...</Link></h6>
                        </>
                    }
                    {/* Event Card Button Container */}
                    <div className="event-card-action-button-container">
                        <button 
                            onClick={this.toggleEventCardExpansion} 
                            className={this.state.isEventCardContainerExpanded ? 
                                "expand-button":
                                "move-expand-button"}
                        >
                                m
                        </button>
                        <button 
                            onClick={this.linkToEventPage}
                            className={this.state.isEventCardContainerExpanded ? 
                                "edit-button":
                                "move-edit-button"}
                        >
                            e
                        </button>
                        {
                            this.state.isEventCardContainerExpanded &&
                            <button className="delete-button" onClick={this.openDeleteConfirmationModal}>d</button>
                        }  
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCard);