import React, { Component } from 'react';
import './../../../scss/eventCard.scss';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {};
}

class EventCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEventCardContainerExpanded: this.props.isEventCardContainerExpanded
        }

        this.toggleEventCardExpansion = this.toggleEventCardExpansion.bind(this);
    }

    componentDidMount() {
        console.log("toggle: ", this.state.isEventCardContainerExpanded);
    }

    componentDidUpdate() {
        console.log("toggle: ", this.state.isEventCardContainerExpanded);
    } 

    toggleEventCardExpansion() {
        this.setState({ isEventCardContainerExpanded: !this.state.isEventCardContainerExpanded });
    }
    
    render() {
        return (
            <div className={this.state.isEventCardContainerExpanded ? 
                                "event-card-container" : 
                                "event-card-container shrink"}>
                {
                    this.state.isEventCardContainerExpanded &&
                    <div className="date-container">
                        <h3 className="date">10</h3>
                        <h3 className="month">FEB</h3>
                        <h4 className="day-year">Wednesday 2019</h4>
                    </div>
                }
                {
                    !this.state.isEventCardContainerExpanded &&
                    <div className="date-container-small">
                        <h3 className="date-small">FEB 10 <span>2019</span></h3>
                    </div>
                }
                <div className="event-info-container">
                    <h2 className="event-name">Game Night</h2>
                    {
                        this.state.isEventCardContainerExpanded && 
                        <>
                            <h4 className="event-location">
                                <span className="logo" id="location">logo</span>
                                123 North Avenue Los Angeles, CA 90041
                            </h4>
                            <h4 className="event-time">
                                <span className="logo" id="time">logo</span>
                                10:00 AM
                            </h4>
                            <h6 className="see-more-button">See more...</h6>
                        </>
                    }
                    <div className="event-card-action-button-container">
                        <button 
                            onClick={this.toggleEventCardExpansion} 
                            className={this.state.isEventCardContainerExpanded ? 
                                "expand-button":
                                "move-expand-button"}
                        >
                                m
                        </button>
                        <button 
                            className={this.state.isEventCardContainerExpanded ? 
                                "edit-button":
                                "move-edit-button"}
                        >
                            e
                        </button>
                        {
                            this.state.isEventCardContainerExpanded &&
                            <button className="delete-button">d</button>
                        }  
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCard);