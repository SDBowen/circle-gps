import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile;
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
        dashboardContent = <h4>Profile will display here</h4>;
      } else {
        // No profile created
        dashboardContent = <h4>Create a profile</h4>;
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  getCurrentProfile
)(Dashboard);
