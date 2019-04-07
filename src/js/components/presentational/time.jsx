/*
    Imports
*/

import React, { Component } from "react"; // React
import "./../../../scss/time.scss"; // SCSS
import { generateNumbersArr } from "./../../utils/generateNumbersArr.js" // Utility Functions
import { MONTHS } from "./../../constants/dateFormat.js"; // Constants

/*
    Time Component
*/

class Time extends Component {
    constructor() {
        super();

        this.state = {
            isHourChoicesOpen: false,
            isMinuteChoicesOpen: false
        }

        this.toggleView = this.toggleView.bind(this);
        this.toggleTimeOfDay = this.toggleTimeOfDay.bind(this);
    }

    toggleView(e, targetDropdown) {
        if(targetDropdown === "hours") {
            this.setState({ isHourChoicesOpen: !this.state.isHourChoicesOpen });
        } else {
            this.setState({ isMinuteChoicesOpen: !this.state.isMinuteChoicesOpen });
        }
    }

    toggleTimeOfDay(e, timeOfDay) {
        this.setState({ timeOfDay });
    }

    render() {
        const activeStyle = {
            "backgroundColor": "#3A8BC2",
            "color": "white",
            "border": "2px solid #3A8BC2"
        }
        const inActiveStyle = {
            "backgroundColor": "white",
            "color": "#3A8BC2",
            "border": "2px solid #3A8BC2"
        }

        let hours =  this.props.time.split(" ").slice(5)[0].split(":")[0];
        let minutes =  this.props.time.split(" ").slice(5)[0].split(":")[1];
        let timeOfDay = this.props.time.split(" ").slice(5)[1];
        return (
            <div className="edit-time-container">
                <div className="hour-output">
                    <div className="hour"><span>{hours}</span></div>
                    <div className="access-edit-time-button" onClick={e => this.toggleView(e, "hours")}><span>&#8595;</span></div>
                    {/* Choices */}
                    {this.state.isHourChoicesOpen && 
                        <section className="edit-hours-container">
                            {generateNumbersArr(1,13).map(hour => {
                                return (
                                    <h6
                                        key={hour}       
                                        className="selectable"
                                        onClick={e => {
                                            this.toggleView(e, "hours");
                                            this.props.handleTimeClick(e, "hours")
                                        }}
                                    >
                                        <span>{hour}</span>
                                    </h6>
                                );
                            })}
                        </section>
                    }
                </div>
                <div className="colon"><span>:</span></div>
                <div className="minute-output">
                    <div className="minute"><span>{minutes}</span></div>
                    <div className="access-edit-time-button" onClick={e => this.toggleView(e, "minutes")}><span>&#8595;</span></div>
                    {/* Choices */}
                    {this.state.isMinuteChoicesOpen &&
                        <section className="edit-minutes-container">
                            {generateNumbersArr(1,60).map(minute => {
                                return (
                                    <h6
                                        key={minute}       
                                        className="selectable"
                                        onClick={e => {
                                            this.toggleView(e, "minutes");
                                            this.props.handleTimeClick(e, "minutes")
                                        }}
                                    >
                                        <span>{minute}</span>
                                    </h6>
                                );
                            })}
                        </section>
                    }
                </div>
                <div 
                    className="time-of-day-output am"
                    style={timeOfDay === "AM" ? activeStyle : inActiveStyle}
                    onClick={e => {
                        this.toggleTimeOfDay(e, "AM");
                        this.props.handleTimeClick(e, "AM");
                    }}
                >
                    <span>AM</span>
                </div>
                <div 
                    className="time-of-day-output pm"
                    style={timeOfDay === "PM" ? activeStyle : inActiveStyle}
                    onClick={e => {
                        this.toggleTimeOfDay(e, "PM")
                        this.props.handleTimeClick(e, "PM");
                    }}
                >
                    <span>PM</span>
                </div>
                
            </div>

        );
    }
}

export default Time;