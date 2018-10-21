import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { addDevice, addUser } from "../../actions/socketActions";
import { Link } from "react-router-dom";

import Map from "./Map";

class Dashboard extends Component {
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
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      if (Object.keys(profile).length > 0) {
        // Display user profile
        dashboardContent = (
          <div>
            <h4>Hello {user.name}!</h4>
            <p>Tracking device:</p>
            <button onClick={this.selectDevice}>{profile.deviceId}</button>
          </div>
        );
      } else {
        // No profile created
        dashboardContent = (
          <div>
            <Link to="/create-profile">
              <h4>Create a profile</h4>
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div>{dashboardContent}</div>
        <Map />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  addUser: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCurrentProfile, addDevice, addUser }
)(Dashboard);
