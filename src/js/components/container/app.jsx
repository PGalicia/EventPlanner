/*
  Imports
*/

import React, { Component } from "react"; // React
import "../../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // Redux
import Main from "./../presentational/main.jsx"; // Component
import Footer from "./../presentational/footer.jsx"; // Component
import DeleteConfirmModal from "./deleteConfirmModal.jsx"; // Component

/*
  mapStateToProps,
  mapDispatchToProps
*/
const mapStateToProps = state => {
  return {
    isDeleteCofirmationModalOpen: state.isDeleteCofirmationModalOpen,
    targetEvent: state.targetEvent
  };
};

/*
  App Component
*/
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        {/* Main Component */}
        <Main />
        {/* Footer Component */}
        <Footer />
        {/* Delete Modal Component */}
        {this.props.isDeleteCofirmationModalOpen && this.props.targetEvent && <DeleteConfirmModal />}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps
)(App);
