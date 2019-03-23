import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {};
}

class EditEvent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <>
                <h1>Edit Event {this.props.match.params.eventId}</h1>
                <h2><Link to={`/events/${this.props.match.params.eventId}`}>Back to View Event {this.props.match.params.eventId}</Link></h2>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEvent);