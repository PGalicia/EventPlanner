/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/nameDisplay.scss"; // SCSS

/*
    NameDisplay Component
*/
const NameDisplay = props => {
    const style = {
        backgroundColor: props.color,
        borderColor: props.color
    }
    
    return (
        <h6 className="attendee">
            <span 
                className="color"  
                style={style}
            />
            <span>{props.name}</span>
        </h6>
    );
}

export default NameDisplay;