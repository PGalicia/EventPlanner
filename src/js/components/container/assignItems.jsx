/*
    Imports
*/

import React, { Component } from "react"; // React
import { Link } from "react-router-dom"; // React-Router-Dom
import "./../../../scss/assignItems.scss"; // SCSS
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { formatEventTitle } from "./../../utils/formatEventTitle.js"; // Constants
import { chooseColors } from "./../../utils/chooseColors.js"; // Utility Function
import { connect } from "react-redux"; // Redux
import { updateAssignItemsChecklist } from "./../../actions/index.js"; // Action Types
import Checkbox from "./../presentational/checkbox.jsx"; // Component 

/*
    mapStateToProps,
    mapDispatchToProps
*/
const mapStateToProps = state => {
    return {
        selectedAssignedItems: state.selectedAssignedItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateAssignItemsChecklist: checklist => dispatch(updateAssignItemsChecklist(checklist))
    }
}


/*
    AssignItems Component
*/

class AssignItems extends Component {
    constructor() {
        super();

        this.state = {
            event: null,
            attendees: [],
            assignedItems: [],
            items: [],
            eventItems: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // Fetch the events with the specified eventId
        fetch(`${REST_API_BASE_PATH}/events/${this.props.match.params.eventId}`)
        .then(res => res.json())
        .then(event => {
            this.setState({ event });
            
            // Find which attendees are going and assign colors
            const people = event.guests;
            const attendees = people.filter(person => person.event_guest.isGoing);

            const colorArray = chooseColors(attendees.length);
            for(let i = 0; i < attendees.length; i++) {
                attendees[i]["color"] = colorArray[i].color;
            }
            this.setState({ attendees });

            // Event Items
            let itemKeys = new Set([]);
            
            for(let item of event.assignedItems) {
                itemKeys.add(item.itemId)
            }
            
            itemKeys = [ ...itemKeys ];
            let assignedItems = [];

            this.setState({ eventItems: itemKeys })

            let selectedAssignedItems = {
                selectedItems: [],
                selectedAttendee: []
            }

            for(let itemIndex of itemKeys) {
                selectedAssignedItems.selectedItems.push({itemId: itemIndex, isChosen: false });
            }

            for(let attendee of attendees) {
                selectedAssignedItems.selectedAttendee.push({ 
                    rowid: attendee.rowid,
                    name: attendee.name, 
                    color: attendee.color, 
                    isChosen: false 
                });
            }

            this.props.updateAssignItemsChecklist(selectedAssignedItems);
            console.log(selectedAssignedItems);
            

            // // Find which items are present in the event
            // this.setState({ assignedItems });
        })
        .then(() => {
            return fetch(`${REST_API_BASE_PATH}/items/`) ;
        })
        .then(res => res.json())
        .then(items => this.setState({ items }));
    }

    handleChange(e) {
        let selectedAssignedItems = { ...this.props.selectedAssignedItems };
        let selectedItems = [ ...selectedAssignedItems.selectedItems ];
        let selectedAttendee = [ ...selectedAssignedItems.selectedAttendee ];

        let bool = e.target.value == "false" ? true : false;

        if(e.target.name === "item"){
            let targetItem = selectedItems.find(item => item.itemId === +e.target.id);
            let targetItemIndex = selectedItems.indexOf(targetItem);
            selectedItems[targetItemIndex].isChosen = bool;
        } else {
            let targetItem = selectedAttendee.find(attendee => attendee.rowid === +e.target.id);
            let targetItemIndex = selectedAttendee.indexOf(targetItem);
            selectedAttendee[targetItemIndex].isChosen = bool;
        }

        selectedAssignedItems["selectedItems"] = selectedItems;
        selectedAssignedItems["selectedAttendee"] = selectedAttendee;
        this.props.updateAssignItemsChecklist(selectedAssignedItems);
    }

    render() {
        return (
            <>
                <div className="assign-items-header-container">
                    <div className="cancel-button">
                        <h2><Link to={`/events/${this.props.match.params.eventId}`}>Cancel</Link></h2>
                    </div>
                    <div className="submit-button">
                        <h2><Link to={`/events/${this.props.match.params.eventId}`}>Submit</Link></h2>
                    </div>
                </div>

                {this.state.event &&
                    <div className="assign-items-body-container container">
                        <h2 className="title-name">{formatEventTitle("Assign Items")}
                            <span className="sub-title">{formatEventTitle(this.state.event.name)}</span>
                        </h2>

                        {/* Select Items Container */}
                        <h6 className="heading">
                                Select items:
                        </h6>
                        <section className="select-items-container">
                            {this.props.selectedAssignedItems.selectedItems.map(item => {
                                const obj = this.state.items.find(i => i.rowid === item.itemId);
                                if(obj) {
                                    return (
                                        <Checkbox 
                                            key={obj.rowid}
                                            id={obj.rowid}
                                            name={obj.name}
                                            category={"item"}
                                            isChosen={item.isChosen}
                                            handleChange={this.handleChange}
                                        />
                                    );
                                }
                                    
                            })}
                        </section>

                        {/* Choose People Container */}
                        <h6 className="heading">
                                Choose people: <span>max 5</span>
                        </h6>
                        <section className="choose-people-container">
                            {this.props.selectedAssignedItems.selectedAttendee.map(attendee => {
                                const obj = this.state.attendees.find(a => a.rowid === attendee.rowid);
                                if(obj) {
                                    return (
                                        <Checkbox 
                                            key={obj.rowid}
                                            id={obj.rowid}
                                            name={obj.name}
                                            category={"attendee"}
                                            isChosen={attendee.isChosen}
                                            handleChange={this.handleChange}
                                        />
                                    );
                                }
                                    
                            })}
                        </section>

                        {/* Review Container */}
                        <h6 className="heading">
                                Review:
                        </h6>
                        <section className="review-container">
                            
                        </section>

                        {/* Buttons */}

                        
                        
                        

                    </div>
                }
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignItems);