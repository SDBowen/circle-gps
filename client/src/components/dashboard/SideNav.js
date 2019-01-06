import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { addDevice, addUser } from "../../actions/socketActions";
import { Link } from "react-router-dom";

import Icon from "../icons";
import Device from "./Device";

class SideNav extends Component {
  selectDevice = event => {
    event.preventDefault();

    let payload = {};
    payload.deviceId = this.props.profile.profile.deviceId;
    payload.userId = this.props.profile.profile.user._id;

    this.props.addDevice(payload);
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.addUser(this.props.auth.user.id);
  }

  render() {
    const { profile, loading } = this.props.profile;

    let deviceListContent;

    if (profile === null || loading) {
      deviceListContent = <h4>Loading...</h4>;
    } else {
      if (Object.keys(profile).length > 0) {
        // Display user profile
        deviceListContent = <Device profile={profile} />;
      } else {
        // No profile created
        deviceListContent = <div>'no profile'</div>;
      }
    }

    return (
      <nav className="sidebar">
        <ul className="side-nav">
          <li className="">
            <a href="#" className="side-nav__link">
              <Icon className="side-nav__icon" name="target" />
              <span>Devices</span>
            </a>
          </li>
          <div>{deviceListContent}</div>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

SideNav.propTypes = {
  addUser: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, addDevice, addUser }
)(SideNav);
