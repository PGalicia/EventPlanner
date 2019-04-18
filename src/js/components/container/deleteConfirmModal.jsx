/*
    Imports
*/

import React, { Component } from "react"; // React
import "./../../../scss/deleteConfirmModal.scss" // SCSS
import { connect } from "react-redux"; // Redux
import { toggleDeleteConfirmationModal, rerenderPage } from "./../../actions/index.js"; // Action-Types
import { deleteEvent } from "./../../utils/deleteEvent.js"; // Utility Function

/*
    mapStateToProps,
    mapDispatchToProps
*/

const mapStateToProps = state => {
    return {
        targetEvent: state.targetEvent
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDeleteConfirmationModal: bool => dispatch(toggleDeleteConfirmationModal(bool)),
        rerenderPage: bool => dispatch(rerenderPage(bool))
    };
}

/*
    DeleteConfirmModal Component
*/
class DeleteConfirmModal extends Component {
    constructor() {
        super();

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel(e) {
        this.props.toggleDeleteConfirmationModal(false);
    }

    handleSubmit(e) {
        deleteEvent(this.props.targetEvent.rowid)
        this.props.toggleDeleteConfirmationModal(false);
        this.props.rerenderPage(true);
    }

    render() {
        return (
            <div className="delete-modal-container">
                <div className="confirmation-container">
                    <h6 className="title-name">Confirm</h6>
                    <p className="confirmation-text">{`Are you sure you want to delete "${this.props.targetEvent.name}"?`}</p>
                    <div className="button-container">
                        <button className="confirmation-button" onClick={this.handleSubmit}>Confirm</button>
                        <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div> 
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteConfirmModal);