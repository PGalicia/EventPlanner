/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/reviewCardAttendee.scss"; // SCSS

/*
    ReviewCardAttendee Component
*/
const ReviewCardAttendee = props => {
    
    return (
        <div className="review-card-attendees-container">
            {props.chosenAttendees.filter(attendee => attendee.isChosen)
                .map(attendee => {
                    return (
                        <div 
                            key={attendee.rowid} 
                            className="attendee-container"
                            style={{"backgroundColor": attendee.color}}
                        >
                            <h6>{attendee.name}</h6>
                        </div>
                    );
            })}
        </div>
    );
}

export default ReviewCardAttendee;