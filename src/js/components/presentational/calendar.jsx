/*
    Imports
*/

import React, { Component } from "react"; // React
import "./../../../scss/calendar.scss"; // SCSS
import { generateNumbersArr } from "./../../utils/generateNumbersArr.js" // Utility Functions
import { MONTHS } from "./../../constants/dateFormat.js"; // Constants

/*
    Calendar Component
*/
class Calendar extends Component {
    constructor() {
        super();

        this.state = {
            view: [
                { id: 0, title: "Select a month"},
                { id: 1, title: "Select a day"},
                { id: 2, title: "Select a year"}
            ],
            currentViewIndex: 0,
            isChoicesOpen: false
        }

        this.changeView = this.changeView.bind(this);
        this.toggleChoices = this.toggleChoices.bind(this);
    }

    changeView(e, buttonPress) {
        if(buttonPress === "left") {
            this.setState({ currentViewIndex: this.state.currentViewIndex - 1 });
        } else {
            this.setState({ currentViewIndex: this.state.currentViewIndex + 1 });
        }
    }

    toggleChoices(e) {
        this.setState({ 
            isChoicesOpen: !this.state.isChoicesOpen,
            currentViewIndex: 0
        });
    }

    render() {
        let year = this.props.date.getFullYear();
        let month = this.props.date.getMonth() + 1;
        let date = this.props.date.getDate();
        let viewClassName = null;

        if(this.state.currentViewIndex === 0) {
            viewClassName = "month";
        } else if(this.state.currentViewIndex === 1) {
            viewClassName = "date";
        } else if(this.state.currentViewIndex === 2) {
            viewClassName = "year";
        }

        return (
            <div className="calendar-container">
                <div className="date-output">
                    <div className="month"><span>{month}</span></div>
                    <div className="slash"><span>/</span></div>
                    <div className="date"><span>{date}</span></div>
                    <div className="slash"><span>/</span></div>
                    <div className="year"><span>{year}</span></div>
                    <div className="access-edit-button" onClick={this.toggleChoices}><span>&#8595;</span></div>
                </div>
                {/* Buttons */}
                {this.state.isChoicesOpen &&
                    <div className="choices-container">
                        <div className="button-title-container">
                            {this.state.currentViewIndex !== 0 ?
                                <button 
                                    className="left-button"
                                    onClick={(e) => this.changeView(e, "left")}
                                >
                                    &#8592;
                                </button> : null
                            }
                            <h6 className="select-title">{this.state.view[this.state.currentViewIndex].title}:</h6>
                            {this.state.currentViewIndex !== 2 ? 
                                <button 
                                    className="right-button"
                                    onClick={(e) => this.changeView(e, "right")}
                                >
                                    &#8594;
                                </button> : null
                            }
                        </div>
                        <div className={`select-${viewClassName}-container`}>

                            {/* Month */}
                            {this.state.currentViewIndex === 0 && Array.from(MONTHS, month => month.month.substring(0,3)).map(month => {
                                return (
                                    <h6 
                                        key={month}
                                        className="selectable"
                                        id="month"
                                        onClick={(e) => this.props.handleCalendarClick(e, "month")}
                                    >
                                        <span>{month}</span>
                                    </h6>
                                );
                            })}

                            {/* Date */}
                            {this.state.currentViewIndex === 1 && generateNumbersArr(1, 32).map(num => {
                                return (
                                    <h6 
                                        key={num}
                                        className="selectable"
                                        id="date"
                                        onClick={(e) => this.props.handleCalendarClick(e, "date")}
                                    >
                                        <span>{num}</span>
                                    </h6>
                                );
                            })}

                            {/* Year */}
                            {this.state.currentViewIndex === 2 && generateNumbersArr(year-2, year+4).map(num => {
                                return (
                                    <h6 
                                        key={num}
                                        className="selectable"
                                        id="year"
                                        onClick={(e) => this.props.handleCalendarClick(e, "year")}
                                    >
                                        <span>{num}</span>
                                    </h6>
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Calendar;