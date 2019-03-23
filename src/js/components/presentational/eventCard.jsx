import React from 'react';
import './../../../scss/eventCard.scss';

const EventCard = () => {
    return (
        <div className="event-card-container">
            <div className="date-container">
                <h3 className="date">10</h3>
                <h3 className="month">FEB</h3>
                <h4 className="day-year">Wednesday 2019</h4>
            </div>
            <div className="event-info-container">
                <h2>EventCard Component</h2>
                <h4>Location</h4>
                <h4>Time</h4>
                <h6>See more...</h6>
            </div>
        </div>
    );
}

export default EventCard;