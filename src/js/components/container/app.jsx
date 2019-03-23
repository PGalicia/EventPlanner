import React, { Component } from "react";

// .scss
import "../../../scss/app.scss";

// redux
import { connect } from "react-redux";
import { changeGreeting } from "../../actions/index.js";

// Components
import Header from "./header.jsx";
import Main from "./../presentational/main.jsx";

/*
  mapStateToProps, mapDispatchToProps
*/
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    changeGreeting: message => dispatch(changeGreeting(message))
  };
};

/*
  main component
*/
class App extends Component {
  constructor() {
    super();

    this.changeGreeting = this.changeGreeting.bind(this);
  }

  changeGreeting() {
    this.props.changeGreeting("Hi World!");
  }

  render() {
    return (
      <React.Fragment>
        {/* <h1>{this.props.message}</h1>
        <button onClick={this.changeGreeting}>Click Me!</button> */}
        {/* Navigation Component */}
        <Header />
        {/* Main Component */}
        <Main />

        {/* Footer Component */}

      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
