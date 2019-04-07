/*
    Imports
*/

import React, { Component } from "react"; // React
import "./../../../scss/editItemDisplay.scss"; // SCSS

/*
    EditItemDisplay Component
*/
class EditItemDisplay extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="edit-item-container">
                <h6 className="name">{this.props.itemName}</h6>
                <button 
                    className="delete-item-button"
                    id={this.props.id}
                    onClick={this.props.handleDeleteButton}
                >
                    &#10060;
                </button>
            </div>
        );
    }
}

export default EditItemDisplay;