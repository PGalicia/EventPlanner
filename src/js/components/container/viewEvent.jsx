/*
    Imports
*/

import React, { Component } from "react"; // React
import { connect } from "react-redux"; // Redux
import { Link } from "react-router-dom"; // React-Router
import "./../../../scss/viewEvent.scss"; // SCSS
import {
    rerenderPage
} from "./../../actions/index.js"; // Action Types
import EditEvent from "./../container/editEvent.jsx"; // Component
import NameDisplay from "./../presentational/nameDisplay.jsx" // Component
import ItemDisplay from "./../presentational/itemDisplay.jsx"; // Component
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { getWholeDateString } from "../../utils/getWholeDateString.js"; // Utility Functions
import { formatEventTitle } from "./../../utils/formatEventTitle.js"; // Utility Function
import { chooseColors } from "./../../utils/chooseColors.js"; // Utility Function

/*
  mapStateToProps,
  mapDispatchToProps
*/

const mapStateToProps = state => {
    return {
        events: state.events,
        shouldReRenderPage: state.shouldReRenderPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        rerenderPage: bool => dispatch(rerenderPage(bool))
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

        this.fetchAndFormatEventInformation = this.fetchAndFormatEventInformation.bind(this);
    }

    componentDidMount() {

        this.fetchAndFormatEventInformation();

    }



    componentDidUpdate() {

        // Rerenders the page during a link Redirect
        if(this.props.shouldReRenderPage) {
            
            this.fetchAndFormatEventInformation();
            this.props.rerenderPage(false);
        }
    }

    fetchAndFormatEventInformation() {

        let newEvent = null;
        let newAttendees = null;
        let newAssignedItem = null;
        let newItems = null;

        // Fetch the events with the specified eventId
        fetch(`${REST_API_BASE_PATH}/events/${this.props.match.params.eventId}`)
        .then(res => res.json())
        .then(event => {
                
                // Find which attendees are going and assign colors
                const people = event.guests;
                const attendees = people.filter(person => person.event_guest.isGoing);

                const colorArray = chooseColors(attendees.length);
                for(let i = 0; i < attendees.length; i++) {
                    attendees[i]["color"] = colorArray[i].color;
                }

                // Attendees
                let itemKeys = new Set([]);
                
                for(let item of event.assignedItems) {
                    itemKeys.add(item.itemId)
                }
                
                itemKeys = [ ...itemKeys ];
                let assignedItems = [];

                for(let itemId of itemKeys) {
                    let x = event.assignedItems.filter(item => item.itemId === itemId);
                    let y = [];
                    x.forEach(row => {
                        let attendee = attendees.find(attendee => row.guestId === attendee.rowid);
                        return y.push({
                            id: row.guestId,
                            color: attendee ? attendee.color : 'grey'
                        })
                    });
                    let formattedAssignedObject = {
                        itemId,
                        attendees: y
                    }
                    assignedItems.push(formattedAssignedObject);
                }

                newEvent = event;
                newAttendees = attendees;
                newAssignedItem = assignedItems;

            })
            .then(() => {
                return fetch(`${REST_API_BASE_PATH}/items/`) ;
            })
            .then(res => res.json())
            .then(items => {
                newItems = items;
            })
            .then(() => {
                this.setState({
                    event: newEvent,
                    attendees: newAttendees,
                    assignedItems: newAssignedItem,
                    items: newItems
                });
            })
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
                                        color={attendee.color}
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
                                            const targetItem = this.state.items.find(item => item.rowid === assignedItem.itemId);
                                            if(targetItem) {
                                                return (
                                                    <ItemDisplay
                                                        key={this.state.assignedItems.indexOf(assignedItem)}
                                                        name={formatEventTitle(targetItem.name)}
                                                        attendees={assignedItem.attendees}
                                                    />
                                                );
                                            }
                                        }
                                    })}
                                </>
                            }
                        </section>
                        {/* Reassign Items Button */}
                        <div className="reassign-items-button">
                            <Link to={`/assign/${this.state.event.rowid}`}><button>Reassign Items</button></Link>  
                        </div>

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