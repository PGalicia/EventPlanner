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
            <div className="navigation_container">
                <h1><Link to={'/'}>Header Component</Link></h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation);