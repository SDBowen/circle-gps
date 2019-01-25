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
        <div class="section-settings">
          <div class="settings-box">
            <div class="settings-box__header">
              <div class="settings-box__option">
                <p>New Device</p>
              </div>
            </div>
            <form class="settings-box__form" onSubmit={this.onSubmit}>
              <div class="settings-box__device-id">
                <input
                  type="text"
                  name="deviceId"
                  placeholder="Device ID"
                  value={this.state.deviceId}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.device && (
                  <p class="settings-box__error">{errors.device}</p>
                )}
              </div>
              <div class="settings-box__device-name">
                <input
                  type="text"
                  name="deviceName"
                  placeholder="Device Name"
                  value={this.state.deviceName}
                  onChange={this.onChange}
                />
              </div>
              <div class="settings-box__submit">
                <input
                  class="settings-box__submit-button"
                  type="submit"
                  value="Add Device  >"
                />
              </div>
            </form>
          </div>
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
