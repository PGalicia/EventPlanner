import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./../../../scss/createNewEvent.scss";

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {

    };
}

class CreateNewEvent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <>
                <div className="create-event-header-container">
                    
                    <div className="delete-button">
                        <h2><Link to={'/'}>Cancel</Link></h2>
                    </div>
                    <div className="submit-button">
                        <h2><Link to={'/'}>Submit</Link></h2>
                    </div>
                </div>
                    <h2 className="title-name">Create Event </h2>
                
                
            </>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNewEvent);