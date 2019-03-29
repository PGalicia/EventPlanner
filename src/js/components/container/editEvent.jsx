/*
    Imports
*/

// React
import React, { Component } from 'react';

// React-Router
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {};
}

/*
    EditEvent Component
*/
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