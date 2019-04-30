import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      deviceName: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.createProfile(deviceData, this.props.history);
  };

  createProfile = (data, history) => {
    axios
      .post('/api/profile', data)
      .then(res => history.push('/dashboard'))
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="section-settings">
          <div className="settings-box">
            <div className="settings-box__header">
              <div className="settings-box__option">
                <p>New Device</p>
              </div>
              <div className="settings-box__links-box">
                <div className="settings-box__link">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              </div>
            </div>
            <form className="settings-box__form" onSubmit={this.onSubmit}>
              <div className="settings-box__device-id">
                <input
                  type="text"
                  name="deviceId"
                  placeholder="Device ID"
                  value={this.state.deviceId}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.device && <p className="settings-box__error">{errors.device}</p>}
              </div>
              <div className="settings-box__device-name">
                <input
                  type="text"
                  name="deviceName"
                  placeholder="Device Name"
                  value={this.state.deviceName}
                  onChange={this.onChange}
                />
              </div>
              <div className="settings-box__submit">
                <input
                  className="settings-box__submit-button"
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

export default withRouter(CreateProfile);
