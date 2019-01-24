import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { addDevice, removeDevice, addUser } from "../../actions/socketActions";
import { Link } from "react-router-dom";

import Icon from "../icons";
import Device from "./Device";

class SideNav extends Component {
  selectDevice = (deviceId, activeStatus) => {
    let payload = {};

    payload.deviceId = deviceId;
    payload.userId = this.props.auth.user.id;

    if (activeStatus) {
      this.props.addDevice(payload);
    } else {
      this.props.removeDevice(payload);
    }
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.addUser(this.props.auth.user.id);
  }

  render() {
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      return (
        <nav className="sidebar">
          <ul className="side-nav">
            <li className="">
              <a href="#" className="side-nav__link">
                <Icon className="side-nav__icon" name="target" />
                <span>Devices</span>
              </a>
            </li>
            <div>Loading...</div>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav className="sidebar">
          <ul className="side-nav">
            <li className="">
              <a href="#" className="side-nav__link">
                <Icon className="side-nav__icon" name="target" />
                <span>Devices</span>
              </a>
            </li>
            <div>
              {/* <Device profile={profile} selectDevice={this.selectDevice} /> */}
              {profile.map((device, index) => {
                return (
                  <Device
                    key={index}
                    device={device}
                    selectDevice={this.selectDevice}
                  />
                );
              })}
            </div>
          </ul>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

SideNav.propTypes = {
  addUser: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  removeDevice: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, addDevice, removeDevice, addUser }
)(SideNav);
