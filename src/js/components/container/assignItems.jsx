/*
    Imports
*/

import React, { Component } from "react"; // React
import { Link, Redirect } from "react-router-dom"; // React-Router-Dom
import "./../../../scss/assignItems.scss"; // SCSS
import { REST_API_BASE_PATH } from "./../../constants/restAPIBasePath.js"; // Constants
import { formatEventTitle } from "./../../utils/formatEventTitle.js"; // Constants
import { chooseColors } from "./../../utils/chooseColors.js"; // Utility Function
import { connect } from "react-redux"; // Redux
import { 
    updateAssignItemsChecklist,
    rerenderPage
} from "./../../actions/index.js"; // Action Types
import Checkbox from "./../presentational/checkbox.jsx"; // Component 
import ReviewCard from "../presentational/reviewCard.jsx"; // Component
import { fetchAllEvents } from "./../../utils/fetchAllEvents.js"; // Utility Function
import { fetchAllItems } from "./../../utils/fetchAllItems.js"; // Utility Function
import { deleteEventItem } from "./../../utils/deleteEventItem.js"; // Utility Function
import { assignItemToAttendee } from "./../../utils/assignItemToAttendee.js"; // Utility Function


/*
    mapStateToProps,
    mapDispatchToProps
*/
const mapStateToProps = state => {
    return {
        selectedAssignedItems: state.selectedAssignedItems,
        shouldReRenderPage: state.shouldReRenderPage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateAssignItemsChecklist: checklist => dispatch(updateAssignItemsChecklist(checklist)),
        rerenderPage: bool => dispatch(rerenderPage(bool))
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
            items: [],
            eventItems: [],
            backToViewEventPage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        let newEvent = null;
        let newAttendees = null;
        let newEventItems = null;

        // Fetch the events with the specified eventId
        fetchAllEvents(this.props.match.params.eventId)
        .then(event => {

            newEvent = event;
            
            // Find which attendees are going and assign colors
            const people = event.guests;
            const attendees = people.filter(person => person.event_guest.isGoing);

            const colorArray = chooseColors(attendees.length);
            for(let i = 0; i < attendees.length; i++) {
                attendees[i]["color"] = colorArray[i].color;
            }

            newAttendees = attendees

            // Event Items
            let itemKeys = new Set([]);
            
            for(let item of event.assignedItems) {
                itemKeys.add(item.itemId)
            }
            
            itemKeys = [ ...itemKeys ];

            newEventItems = itemKeys

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
        })
        .then(() => fetchAllItems())
        .then(items => {
            this.setState({
                event: newEvent,
                attendees: newAttendees,
                eventItems: newEventItems,
                items 
            });
        });
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

    handleSubmit(e) {
        // Find the selected items
        // Iterate through the selected items
            // Delete every row that has the selected item in the table
            // Format Items to look like the rows in the assignedItems table
            // Add the item to the row
        // Redirect back to event page

        const selectedAssignedItems = this.props.selectedAssignedItems;
        const eventId = this.state.event.rowid;
    

        // If there are items chosen but no attendees, then return the items as unassigned
        if(selectedAssignedItems.selectedItems.filter(item => item.isChosen).length > 0 &&
            selectedAssignedItems.selectedAttendee.filter(attendee => attendee.isChosen).length === 0) {

                // **Temporary fix
                this.props.rerenderPage(true);
                this.setState({ backToViewEventPage: true });
                return;
        }

        for(let item of selectedAssignedItems.selectedItems) {
            
            // If item is not chosen, skip it
            if(!item.isChosen) {
                continue;
            }

            deleteEventItem(eventId, item.itemId)
                .then(() => {
                    for(let attendee of selectedAssignedItems.selectedAttendee) {

                        // If attendee is not chosen, skip it
                        if(!attendee.isChosen) {
                            continue;
                        }
        
                        assignItemToAttendee(eventId, item.itemId, attendee.rowid)
        
                    }
                })
                .then(() => {
                    this.props.rerenderPage(true);
                    this.setState({ backToViewEventPage: true })
                })
        }
    }

    render() {

        // Redirects the page after submit
        if(this.state.backToViewEventPage) {
            return <Redirect to={`/events/${this.props.match.params.eventId}`} />
        }
    
        return (
            <>
                <div className="assign-items-header-container">
                    <div className="cancel-button">
                        <h2><Link to={`/events/${this.props.match.params.eventId}`}>Cancel</Link></h2>
                    </div>
                    <div className="submit-button" onClick={this.handleSubmit}>
                        <h2>Submit</h2>
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
                        {this.props.selectedAssignedItems.selectedItems.filter(item => item.isChosen).length > 0 &&
                            <>
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
                                                    color={attendee.color}
                                                />
                                            );
                                        }
                                            
                                    })}
                                </section>
                            </>
                        }
                    

                        {/* Chosen People Container */}
                        {this.props.selectedAssignedItems.selectedAttendee.filter(attendee => attendee.isChosen).length > 0 &&
                            <>
                                <h6 className="heading">
                                        Chosen People:
                                </h6>
                                <section className="chosen-people-container">
                                    <ReviewCard chosenAttendees={this.props.selectedAssignedItems.selectedAttendee}/>
                                </section>
                            </>
                        }               

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