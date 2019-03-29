/*
    Imports
*/

import React, { Component } from "react"; // React
import { connect } from "react-redux"; // Redux
import { Link } from "react-router-dom"; // React-Router
import "./../../../scss/viewEvent.scss"; // SCSS
import EditEvent from "./../container/editEvent.jsx"; // Component
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { getWholeDateString } from "../../utils/getWholeDateString.js"; // Utility Functions

/*
  mapStateToProps,
  mapDispatchToProps
*/

const mapStateToProps = state => {
    return {
        events: state.events
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

/*
  ViewEvent Component
*/

class ViewEvent extends Component {
    constructor() {
        super();

        this.state = {
            event: null
        }
    }

    componentDidMount() {
        // Fetch the events with the specified eventId
        fetch(`${REST_API_BASE_PATH}/events/${this.props.match.params.eventId}`)
            .then(res => res.json())
            .then(event => {
                this.setState({ event });
            
            });
            
    }

    render() {
        return(
            <>
                {/* <h1>View Event {this.props.match.params.eventId} Component</h1>
                <h2><Link to={"/"}>Back to Home</Link></h2>
                <h3><Link to={"/edit/1"}>Edit {this.props.match.params.eventId}</Link></h3> */}

                <div className="view-event-header-container">
                    <div className="back-button">
                        <h2><Link to={'/'}>Back</Link></h2>
                    </div>
                    <div className="edit-button">
                        <h2><Link to={'/edit/1'}>Edit</Link></h2>
                    </div>
                    <div className="delete-button">
                        <h2><Link to={'/'}>Delete</Link></h2>
                    </div>
                </div>

                {this.state.event &&
                    <>
                        <h2 className="title-name">{this.state.event.name}</h2>
                        <section className="datetime-location-container">
                            <div className="datetime">{getWholeDateString(new Date(this.state.event.datetime))}</div>
                            <div className="location">{this.state.event.location}</div>
                            <div className="map"></div>
                        </section>
                    </>
                }
                
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewEvent);