import React, { Component } from 'react';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStatus: false
    };
  }

  handleClick = deviceId => {
    const currentState = this.state.activeStatus;

    this.setState({ activeStatus: !currentState }, function() {
      this.props.selectDevice(deviceId, this.state.activeStatus);
    });
  };

  render() {
    return (
      <li
        className={
          this.state.activeStatus ? 'side-nav__item side-nav__item--active' : 'side-nav__item'
        }
      >
        <a
          href="#"
          className="side-nav__link"
          onClick={event => {
            event.preventDefault();

            this.handleClick(this.props.device.deviceId);
          }}
        >
          <span>{this.props.device.deviceName}</span>
        </a>
      </li>
    );
  }
}

export default Device;
