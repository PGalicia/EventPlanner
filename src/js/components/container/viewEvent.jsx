/*
    Imports
*/

import React, { Component } from "react"; // React
import { connect } from "react-redux"; // Redux
import { Link } from "react-router-dom"; // React-Router
import "./../../../scss/viewEvent.scss"; // SCSS
import EditEvent from "./../container/editEvent.jsx"; // Component
import NameDisplay from "./../presentational/nameDisplay.jsx" // Component
import ItemDisplay from "./../presentational/itemDisplay.jsx"; // Component
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { getWholeDateString } from "../../utils/getWholeDateString.js"; // Utility Functions
import { formatEventTitle } from "./../../utils/formatEventTitle.js"; // Utility Function

/*
  mapStateToProps,
  mapDispatchToProps
*/

const mapStateToProps = state => {
    return {
        events: state.events
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

/*
  ViewEvent Component
*/

class ViewEvent extends Component {
    constructor() {
        super();

        this.divWidth = React.createRef();

        this.state = {
            event: null,
            attendees: [],
            assignedItems: [],
            items: []
        }
    }

    componentDidMount() {
        // Fetch the events with the specified eventId
        fetch(`${REST_API_BASE_PATH}/events/${this.props.match.params.eventId}`)
            .then(res => res.json())
            .then(event => {
                
                // Find which attendees are going
                const people = event.guests;
                const attendees = people.filter(person => person.event_guest.isGoing);
                this.setState({ attendees });

                // Find which items are present in the event
                const assignedItems = event.assignedItems;
                
                this.setState({ assignedItems });

                this.setState({ event });
            })
            .then(() => {
                return fetch(`${REST_API_BASE_PATH}/items/`);
            })
            .then(res => res.json())
            .then(items => this.setState({ items }))
    }

    render() {
        return(
            <>
                {/* <h1>View Event {this.props.match.params.eventId} Component</h1>
                <h2><Link to={"/"}>Back to Home</Link></h2>
                <h3><Link to={"/edit/1"}>Edit {this.props.match.params.eventId}</Link></h3> */}

                <div className="view-event-header-container">
                    <div className="back-button">
                        <h2><Link to={'/'}>Back</Link></h2>
                    </div>
                    <div className="edit-button">
                        <h2><Link to={'/edit/1'}>Edit</Link></h2>
                    </div>
                    <div className="delete-button">
                        <h2><Link to={'/'}>Delete</Link></h2>
                    </div>
                </div>

                {this.state.event &&
                    <div className="view-event-body-container container">
                        <h2 className="title-name">{formatEventTitle(this.state.event.name)}</h2>
                        <section className="datetime-location-container">
                            <div className="datetime">
                                <h6 className="heading">
                                    <span className="logo">logo</span>
                                    Will be:
                                </h6>
                                <h6 className="mainInformation">{getWholeDateString(new Date(this.state.event.datetime))}</h6>
                            </div>
                            <div className="location">
                                <h6 className="heading">
                                <span className="logo">logo</span>
                                    Will be held at:
                                </h6>
                                <h6 className="mainInformation">{this.state.event.location} Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>
                            </div>
                            <div className="map"></div>
                        </section>
                        {/* Attendees Section */}
                        <h6 className="heading">
                            <span className="logo">logo</span>
                                Attendees:
                        </h6>
                        <section className="attendees-container">
                            {/* Create a name display component */}
                            {this.state.attendees.map(attendee => {
                                return (
                                    <NameDisplay 
                                        key={attendee.rowid}
                                        name={formatEventTitle(attendee.name)}
                                        color="#000"
                                    />
                                );
                            })}
                        </section>
                        {/* Items Section */}
                        <h6 className="heading">
                            <span className="logo">logo</span>
                                Items:
                        </h6>
                        <section 
                            className="items-container"
                            ref={this.divWidth}
                            
                        >
                            {(this.state.assignedItems.length > 0 && this.state.items.length > 0) &&
                                <>
                                    {this.state.assignedItems.map(assignedItem => {
                                        if(assignedItem) {
                                            const targetItem = this.state.items.find(item => item.rowid === assignedItem.rowid);
                                            if(targetItem) {
                                                return (
                                                    <ItemDisplay
                                                        key={assignedItem.rowid}
                                                        name={formatEventTitle(targetItem.name)}
                                                        count={Math.floor(Math.random() * Math.floor(3))}
                                                    />
                                                );
                                            }
                                        }
                                    })}
                                </>
                            }
                        </section>

                    </div>
                }
                
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEvent);