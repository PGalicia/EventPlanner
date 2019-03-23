import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import EditEvent from "./../container/editEvent.jsx";

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

class ViewEvent extends Component {
    constructor() {
        super();    
    }
    render() {
        return(
            <>
                <h1>View Event {this.props.match.params.eventId} Component</h1>
                <h2><Link to={"/"}>Back to Home</Link></h2>
                <h3><Link to={"/edit/1"}>Edit {this.props.match.params.eventId}</Link></h3>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEvent);