import React, { Component } from "react";
import "./../../../scss/dropdownButtonTEST.scss";

class DropdownButton extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton() {
    this.setState({ active: !this.state.active });
    console.log("state: ", this.state.active);
  }

  render() {
    return (
      <div
        className={this.state.active ? "container rotate" : "container"}
        onClick={this.toggleButton}
      >
        <span className="arrow-down" id="left" />
        <span className="arrow-down" id="right" />
      </div>
    );
  }
}

export default DropdownButton;
