import React, { Component } from 'react';
import './../../../scss/eventCard.scss';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {};
}

class EventCard extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="event-card-container">
                <div className="date-container">
                    <h3 className="date">10</h3>
                    <h3 className="month">FEB</h3>
                    <h4 className="day-year">Wednesday 2019</h4>
                </div>
                <div className="event-info-container">
                    <h2 className="event-name">Game Night</h2>
                    <h4 className="event-location">
                        <span className="logo" id="location">logo</span>
                        123 North Avenue Los Angeles, CA 90041
                    </h4>
                    <h4 className="event-time">
                        <span className="logo" id="time">logo</span>
                        10:00 AM
                    </h4>
                    <h6 className="see-more-button">See more...</h6>
                    <div className="event-card-action-button-container">
                        <button id="expand-button">m</button>
                        <button id="edit-button">e</button>
                        <button id="delete-button">d</button>
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