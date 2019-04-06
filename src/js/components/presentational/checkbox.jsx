/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/checkbox.scss"; // SCSS

/*
    Checkbox
*/

const Checkbox = props => {
    return (
        <label className="checkbox-container">
            {props.name}
            <input 
                type="checkbox"
                className="checkbox"
                id={props.id}
                name={props.category}
                value={props.isChosen}
                checked={props.isChosen}
                onChange={props.handleChange}
            />
            
            <span className="checkmark" style={{'backgroundColor': props.color}}></span>
        </label>
    );
}

export default Checkbox;