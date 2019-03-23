import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
                <h1>Create New Event Component</h1>
                <Link to={'/'}>Back to home</Link>
                
            </>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNewEvent);