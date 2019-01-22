// //////////////////////////////////////////////////////////
// Review mockup when additonal device support is implemented
// //////////////////////////////////////////////////////////

import React, { Component } from "react";

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatus: false
    };
  }

  toggleActiveState() {
    const currentState = this.state.activeStatus;

    this.setState({ activeStatus: !currentState });
  }

  render() {
    return (
      <li
        className={
          this.state.activeStatus
            ? "side-nav__item side-nav__item--active"
            : "side-nav__item"
        }
      >
        <a
          href="#"
          className="side-nav__link"
          onClick={e => {
            this.props.selectDevice(e);
            this.toggleActiveState();
          }}
        >
          <span>{this.props.profile.deviceName}</span>
        </a>
      </li>
    );
  }
}

export default Device;
