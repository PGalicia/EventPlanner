/*
  Imports
*/

import React, { Component } from "react"; // React
import "../../../scss/app.scss"; // SCSS
import { connect } from "react-redux"; // Redux
import Main from "./../presentational/main.jsx"; // Component
import Footer from "./../presentational/footer.jsx"; // Component

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
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
