import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { addUser, addDevice, removeDevice, stateReset } from '../../actions/socketActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import Navbar from '../layout/Navbar';
import Map from '../map/Map';
import SideNav from '../sidenav/SideNav';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: {},
      deviceAction: {}
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

  componentDidUpdate(prevProps) {
    if (
      // Check socket data for change
      JSON.stringify(this.props.socket) !== JSON.stringify(prevProps.socket)
    ) {
      if (this.props.socket.lastCoords) {
        const data = {};

        data.deviceId = this.props.socket.lastCoords.id;
        data.lat = this.props.socket.lastCoords.lat;
        data.lon = this.props.socket.lastCoords.lon;

        this.updateDeviceCoordinate(data);
      }
    }
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
    const action = {};

    devices[deviceId].active = !devices[deviceId].active;
    action.type = 'status';
    action.deviceId = deviceId;
    action.active = devices[deviceId].active;

    this.setState({ devices, deviceAction: action });

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
      devices[deviceId].coords = {};
    });
    this.setState({
      devices
    });
  };

  updateDeviceCoordinate = data => {
    const { devices } = { ...this.state };
    const action = data;

    action.type = 'coords';
    devices[data.deviceId].coords.lat = data.lat;
    devices[data.deviceId].coords.lon = data.lon;

    this.setState({
      devices,
      deviceAction: action
    });
  };

  render() {
    const { devices, deviceAction } = this.state;

    return (
      <div>
        <Navbar onLogoutClick={this.onLogoutClick} />
        <div className="content">
          <SideNav devices={devices} selectDevice={this.selectDevice} />
          <Map devices={devices} deviceAction={deviceAction} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  socket: state.socket
});

Dashboard.propTypes = {
  addUser: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  removeDevice: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  stateReset: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addUser, addDevice, removeDevice, logoutUser, clearCurrentProfile, stateReset }
)(Dashboard);
