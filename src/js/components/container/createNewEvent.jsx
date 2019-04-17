/*
    Imports
*/

import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Router
import { Link, Redirect } from "react-router-dom"; // React-Router
import "./../../../scss/createNewEvent.scss"; // SCSS
import Calendar from "./../presentational/calendar.jsx"; // Component
import Time from "./../presentational/time.jsx"; // Component
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { MONTHS } from "./../../constants/dateFormat.js" // Constants
import { getWholeDateString } from "./../../utils/getWholeDateString.js"; // Utility Function

/*
    mapStateToProps,
    mapDispatchToProps
*/
const mapStateToProps = state => {
    return state;
};

/*
    CreateNewEvent Component
*/

class CreateNewEvent extends Component {
    constructor() {
        super();

        this.state = {
            event: {
                name: "",
                location: "",
                datetime: ""
            },
            backToHomePage: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleTimeClick = this.handleTimeClick.bind(this);
        this.handleCalendarClick = this.handleCalendarClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        let event = { ...this.state.event };
        event.datetime = new Date(Date.now()).toISOString();
        this.setState({ event });

    }

    handleOnChange(e, targetInput) {

        let event = { ...this.state.event };
        const inputValue = e.target.value;

        switch(targetInput) {
            case "name":
                event.name = inputValue;
                break;
            case "address":
                event.location = inputValue;
                break;
            default:
                return;
        }

        this.setState({ event });
    }

    handleCalendarClick(e, targetDatePart) {

        let event = { ...this.state.event };
        
        const oldDate = new Date(event.datetime);
        let year = oldDate.getFullYear();
        let time = event.datetime.split("T")[1];
        let month = oldDate.getMonth().toString().length === 1 ? "0".concat(oldDate.getMonth() + 1) : oldDate.getMonth() + 1;
        let date = oldDate.getDate().toString().length === 1 ? "0".concat(oldDate.getDate()) : oldDate.getDate();
        let newDate = null;
        let formatDate = null;

        switch(targetDatePart) {
            case "month":
                let monthStringToID = MONTHS.find(month => month.month.substring(0, 3) === e.currentTarget.textContent).id + 1;
                formatDate = monthStringToID.toString().length === 1 ? "0".concat(monthStringToID) : monthStringToID;
                newDate = `${year}-${formatDate}-${date}T${time}`;
                break;
            case "date":
                formatDate = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent) : e.currentTarget.textContent;
                newDate = `${year}-${month}-${formatDate}T${time}`;
                break;
            case "year":
                formatDate = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent) : e.currentTarget.textContent;
                newDate = `${formatDate}-${month}-${date}T${time}`;
                break;
            default:
                return;
        }

        event.datetime = newDate;
        this.setState({ event });
    }

    handleTimeClick(e, targetTimePart) {

        let event = { ...this.state.event };
        let date = event.datetime.toString().split("T");
        let time = date[1].split(":");
        let timeOfDay = 0 <= parseInt(time[0]) && parseInt(time[0]) <= 11 ? "AM" : "PM";

        switch(targetTimePart) {
            case "AM":
                timeOfDay = "AM";
                break;
            case "PM":
                timeOfDay = "PM";
                break;
            case "hours":
                time[0] = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent.toString()) : e.currentTarget.textContent.toString();
                break;
            case "minutes":
                time[1] = e.currentTarget.textContent.length === 1 ? "0".concat(e.currentTarget.textContent) : e.currentTarget.textContent;
                break;
            default:
                return;
        }

        time[0] = timeOfDay === "AM" ? time[0] = (parseInt(time[0]) % 12).toString() : time[0] = ((parseInt(time[0]) % 12) + 12).toString();
        time[0] = time[0].length === 1 ? "0".concat(time[0]) : time[0];

        date[1] = time.join(":");   
        event.datetime = date.join("T");
        this.setState({ event });
    }

    handleCancel(e) {
        this.setState({ backToHomePage: true });
    }

    handleSubmit(e) {

        let { name, datetime, location } = this.state.event;

        if(name === "" || location === "") { return; }
        datetime = datetime.replace(/[TZ]/g," ").trim().split(".")[0];

        fetch(`${REST_API_BASE_PATH}/events/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                location: location,
                datetime: datetime
            })
        })
            .then(() => {
                this.setState({ backToHomePage: true })
            })
    }

    render() {
        let todayDate = this.state.event.datetime !== "" ? new Date(this.state.event.datetime) : new Date(Date.now());
        // Redirects the page after submit
        if(this.state.backToHomePage) {
            return <Redirect to="/" />
        }
        return (
            <>
                <div className="create-event-header-container">

                    {/* Delete Button */}
                    <div className="cancel-button">
                        <h2><Link to={'/'}>Cancel</Link></h2>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-button">
                        <h2><Link to={'/'}>Submit</Link></h2>
                    </div>
                </div>
                <div className="create-event-body-container container">
                    <h2 className="title-name">Create Event</h2>

                    <section className="create-event-main-info-container">
                        {/* Name Section */}
                        <div className="name-container">
                            <h6 className="heading">Name:</h6>
                            <input 
                                className="input" 
                                onChange={e => this.handleOnChange(e, "name")}
                                placeholder="Some Party"
                            /> 
                        </div>
                        {/* Address Section */}
                        <div className="address-container">
                            <h6 className="heading">Address:</h6>
                            <input 
                                className="input" 
                                onChange={e => this.handleOnChange(e, "address")}
                                placeholder={"123 Fake Avenue Los Angeles, CA 12345"}
                            />
                        </div>
                        
                        {/* Date Section */}
                        <div className="date-container">
                            <h6 className="heading">Date:</h6>
                            <Calendar 
                                date={todayDate}
                                handleCalendarClick={this.handleCalendarClick}
                            />
                        </div>

                        {/* Time Section */}
                        <div className="time-container">
                            <h6 className="heading">Start Time:</h6>
                            <Time 
                                time={getWholeDateString(todayDate)}
                                handleTimeClick={this.handleTimeClick}
                            />
                        </div>
                    </section>

                    <div className="submit-button-large" onClick={this.handleSubmit}>
                            <h2>Create Event</h2>
                        </div>
                    <div className="cancel-button-large" onClick={this.handleCancel}>
                        <h2>Cancel</h2>
                    </div>
                </div>
                

                
            </>
        )
    }
}

export default connect(
    mapStateToProps
)(CreateNewEvent);