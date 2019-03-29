/*
    Imports
*/

import React, { Component } from "react"; // React
import "./../../../scss/header.scss"; // SCSS
import { connect } from "react-redux"; // Redux
import { Link } from "react-router-dom"; // React-Router

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
};

/*
    Navigation Component
*/

class Navigation extends Component {
    constructor() {
        super();
    }
    
    render(){
        return (
            <div className="home-header-container">
                <h1 className="logo"><Link to={'/'}>Event Planner</Link></h1>
                <div className="add-button">
                    <h2><Link to={'/create_new_event'}>Add</Link></h2>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation);