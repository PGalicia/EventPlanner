/*
    Imports
*/

import React, { Component } from 'react'; // React
import { connect } from 'react-redux'; // Redux
import { Link, Redirect } from 'react-router-dom'; // React-Router
import "./../../../scss/editEvent.scss"; // SCSS
import Calendar from "./../presentational/calendar.jsx"; // Component
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js" // Constants
import { MONTHS } from "./../../constants/dateFormat.js"; // Constants
import { formatEventTitle } from "./../../utils/formatEventTitle.js" // Utility Functions
import { chooseColors } from "./../../utils/chooseColors.js" // Utility Functions
import { rerenderPage } from "./../../actions/index.js"; // Action Types


/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
    return {
        shouldReRenderPage: state.shouldReRenderPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        rerenderPage: bool => dispatch(rerenderPage(bool))
    };
}

/*
    EditEvent Component
*/
class EditEvent extends Component {
    constructor() {
        super();

        this.state = {
            event: null,
            attendees: [],
            assignedItems: [],
            items: [],
            newDate: null,
            backToViewEventPage: false
        }

        this.fetchAndFormatEventInformation = this.fetchAndFormatEventInformation.bind(this);
        this.handleCalendarClick = this.handleCalendarClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.fetchAndFormatEventInformation();

    }


    fetchAndFormatEventInformation() {

        let newEvent = null;
        let newAttendees = null;
        let newAssignedItem = null;
        let newItems = null;
        let newDate = null;

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
                newDate = event.datetime;

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
                    items: newItems,
                    newDate
                });
            })
    }

    handleCalendarClick(e, targetDatePart) {

        // Determine if the chosen value is year, month, date
        // Change based on the value

        const oldDate = new Date(this.state.newDate);
        let year = oldDate.getFullYear();
        let month = oldDate.getMonth().toString().length === 1 ? "0".concat(oldDate.getMonth() + 1) : oldDate.getMonth() + 1;
        let date = oldDate.getDate().toString().length === 1 ? "0".concat(oldDate.getDate()) : oldDate.getDate();
        let newDate = null;
        let formatDate = null;

        console.log(e.currentTarget.textContent);
        switch(targetDatePart) {
            case "month":
                let monthStringToID = MONTHS.find(month => month.month.substring(0, 3) === e.currentTarget.textContent).id + 1;
                formatDate = monthStringToID.toString().length === 1 ? "0".concat(monthStringToID) : monthStringToID;
                newDate = `${year}-${formatDate}-${date}T10:00:00.000Z`;
                break;
            case "date":
                formatDate = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent) : e.currentTarget.textContent;
                newDate = `${year}-${month}-${formatDate}T10:00:00.000Z`;
                break;
            case "year":
                formatDate = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent) : e.currentTarget.textContent;
                newDate = `${formatDate}-${month}-${date}T10:00:00.000Z`;
                break;
            default:
                return;
        }

        this.setState({ newDate });
    }

    handleSubmit(e) {

        let queries = [];

        if(this.state.newDate) {
            // format the string first
            queries.push(`datetime=${this.state.newDate.toString().replace(/T|Z|.000/g, ' ').trim().replace(' ', '+')}`);
        } 

        fetch(`${REST_API_BASE_PATH}/events/${this.props.match.params.eventId}?${queries.join("&")}`, {
            method: "PATCH"
        })
        .then(() => {
            this.props.rerenderPage(true);
            this.setState({ backToViewEventPage: true })
        })

    }

    render() {

        // Redirects the page after submit
        if(this.state.backToViewEventPage) {
            return <Redirect to={`/events/${this.props.match.params.eventId}`} />
        }

        return (
            <>
                <div className="edit-event-header-container">
                    <div className="back-button">
                        <h2><Link to={`/events/${this.props.match.params.eventId}`}>Back</Link></h2>
                    </div>
                    <div className="submit-button" onClick={this.handleSubmit}>
                        <h2>Submit</h2>
                    </div>
                    <div className="delete-button">
                        <h2><Link to={'/'}>Delete</Link></h2>
                    </div>
                </div>

                {this.state.event && 
                    <div className="edit-event-body-container container">
                            <h2 className="title-name">{formatEventTitle("Edit Event")}
                                <span className="sub-title">{formatEventTitle(this.state.event.name)}</span>
                            </h2>
                            
                            <section className="edit-event-main-info-container">
                                <Calendar 
                                    date={new Date(this.state.newDate)}
                                    handleCalendarClick={this.handleCalendarClick}
                                />
                            </section>
                            <section className="edit-event-guest-container"></section>
                            <section className="edit-event-items-container"></section>
                    </div>
                }
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEvent);