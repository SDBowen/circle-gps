import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { addUser, addDevice, removeDevice } from '../../actions/socketActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import Navbar from '../layout/Navbar';
import Map from '../map/Map';
import SideNav from '../sidenav/SideNav';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: {}
    };
  }

  componentDidMount() {
    const { addUser, auth } = this.props;

    axios
      .get('/api/profile')
      .then(res => this.buildDeviceObjects(res.data))
      .catch(err => console.log(err));

    addUser(auth.user.id);
  }

  onLogoutClick = event => {
    const { clearCurrentProfile, logoutUser } = this.props;
    event.preventDefault();

    clearCurrentProfile();
    logoutUser();
  };

  selectDevice = deviceId => {
    const { addDevice, removeDevice, auth } = this.props;
    const { devices } = { ...this.state };

    devices[deviceId].active = !devices[deviceId].active;

    this.setState({ devices });

    const payload = {};

    payload.deviceId = deviceId;
    payload.userId = auth.user.id;

    if (devices[deviceId].active) {
      addDevice(payload);
    } else {
      removeDevice(payload);
    }
  };

  buildDeviceObjects = items => {
    const devices = {};

    items.forEach(item => {
      const { deviceId } = item;

      devices[deviceId] = item;
      devices[deviceId].active = false;
    });
    this.setState({
      devices
    });
  };

  render() {
    const { devices } = this.state;

    return (
      <div>
        <Navbar onLogoutClick={this.onLogoutClick} />
        <div className="content">
          <SideNav devices={devices} selectDevice={this.selectDevice} />
          <Map />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Dashboard.propTypes = {
  addUser: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  removeDevice: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.object).isRequired
};

export default connect(
  mapStateToProps,
  { addUser, addDevice, removeDevice, logoutUser, clearCurrentProfile }
)(Dashboard);
