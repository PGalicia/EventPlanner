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
            <div className="header-container">
                <h1 className="logo"><Link to={'/'}>Event Planner</Link></h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation);