/*
    Imports
*/

import React from "react"; // React
import "./../../../scss/header.scss"; // SCSS
import { Link } from "react-router-dom"; // React-Router

/*
    Navigation Component
*/

const Navigation = props => {
    return (
        <div className="home-header-container">
            <h1 className="logo"><Link to={'/'}>Event Planner</Link></h1>
            <div className="add-button">
                <h2><Link to={'/create_new_event'}>Add</Link></h2>
            </div>
        </div>
    );
    
}

export default Navigation;