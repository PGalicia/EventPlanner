/*
    Imports
*/

import React, { Component } from "react"; // React
import { connect } from "react-redux"; // React-Router
import { Link } from "react-router-dom"; // React-Router
import "./../../../scss/createNewEvent.scss"; // SCSS

/*
    mapStateToProps,
    mapDispatchToProps
*/
const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {

    };
}

/*
    CreateNewEvent Component
*/

class CreateNewEvent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <>
                <div className="create-event-header-container">

                    {/* Delete Button */}
                    <div className="cancel-button">
                        <h2><Link to={'/'}>Cancel</Link></h2>
                    </div>

                    {/* Submit Button */}
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