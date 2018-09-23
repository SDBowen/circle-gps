import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: "",
      deviceName: "",
      errors: {}
    };
  }

  // State is updated on user input
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On form submit, user input is validated and sent to profile api
  // error returned if invalid
  onSubmit = event => {
    event.preventDefault();

    // User entered data object
    const deviceData = {
      deviceId: this.state.deviceId,
      deviceName: this.state.deviceName
    };

    this.props.createProfile(deviceData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>Enter Profile Detail</div>
        <div>
          <form onSubmit={this.onSubmit}>
            Device ID:
            <br />
            <input
              type="text"
              name="deviceId"
              placeholder="Device ID"
              value={this.state.deviceId}
              onChange={this.onChange}
            />
            {/* If errors, display to user */}
            {errors.deviceId && <p>{errors.deviceId}</p>}
            <br />
            Device Name:
            <br />
            <input
              type="text"
              name="deviceName"
              placeholder="Device Name"
              value={this.state.deviceName}
              onChange={this.onChange}
            />
            {/* If errors, display to user */}
            {errors.deviceName && <p>{errors.deviceName}</p>}
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
