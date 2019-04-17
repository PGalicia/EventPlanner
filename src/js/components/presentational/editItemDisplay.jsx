/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/editItemDisplay.scss"; // SCSS

/*
    EditItemDisplay Component
*/
const EditItemDisplay = props => {
    return (
        <div className="edit-item-container">
            <h6 className="name">{props.itemName}</h6>
            <button 
                className="delete-item-button"
                id={props.id}
                onClick={props.handleDeleteButton}
            >
                &#10060;
            </button>
        </div>
    );
    
}

export default EditItemDisplay;