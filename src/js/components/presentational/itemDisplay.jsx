/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/itemDisplay.scss"; // SCSS

/*
    ItemDisplay Component
*/
const ItemDisplay = props => {
    const containerStyle = {
        backgroundColor: props.attendees[0].color
    }

    return (
        <div 
            className="item-container"
            style={containerStyle}
        >
            <h6 className="item-name">{props.name}</h6>
            {props.attendees.slice(1).map(attendee => {
                return (
                    <div 
                        key={attendee.rowid} 
                        className="block" 
                        style={{backgroundColor: attendee.color}}
                    />
                );
            })}
        </div>
    );
}

export default ItemDisplay;