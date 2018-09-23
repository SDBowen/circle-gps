import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile;
  }

  render() {
    return (
      <div>
        <div>Here is the dash</div>
      </div>
    );
  }
}

export default connect(
  null,
  getCurrentProfile
)(Dashboard);
