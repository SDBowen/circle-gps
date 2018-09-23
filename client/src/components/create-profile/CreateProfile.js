import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
      login: this.state.deviceId,
      password: this.state.deviceName
    };
  };

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
            {errors.device && <p>{errors.device}</p>}
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

export default connect(mapStateToProps)(CreateProfile);
