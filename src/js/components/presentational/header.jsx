import React, { Component } from "react";
import "./../../../scss/header.scss";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

/*
  mapStateToProps, mapDispatchToProps
*/
const mapStateToProps = state => {
    return state;
  };
  
const mapDispatchToProps = dispatch => {
    return {
        
    };
};

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