import React, { Component } from "react";

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatus: false
    };
  }

  handleClick = deviceId => {
    this.props.selectDevice(deviceId);
  };

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
          onClick={event => {
            event.preventDefault();

            this.handleClick(this.props.device.deviceId);
            this.toggleActiveState();
          }}
        >
          <span>{this.props.device.deviceName}</span>
        </a>
      </li>
    );
  }
}

export default Device;
