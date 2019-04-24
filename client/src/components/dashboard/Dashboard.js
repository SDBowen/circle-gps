import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import setAuthToken from '../../utils/setAuthToken';

import Navbar from '../layout/Navbar';
import Map from '../map/Map';
import SideNav from '../sidenav/SideNav';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: {},
      deviceAction: {},
      response: false,
      endpoint: process.env.REACT_APP_API_URL,
      socket: false
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    axios
      .get('/api/profile')
      .then(res => this.buildDeviceObjects(res.data))
      .catch(err => console.log(err));

    socket.emit('addUser', auth.user.id);
    socket.on('coordsUpdate', data => this.setState({ response: data }));

    this.setState({ socket });
  }

  componentDidUpdate(prevProps, prevState) {
    const { response } = this.state;

    if (
      // Check socket data for change
      JSON.stringify(response) !== JSON.stringify(prevState.response)
    ) {
      if (response) {
        const data = {};

        data.deviceId = response.id;
        data.lat = response.lat;
        data.lon = response.lon;

        this.updateDeviceCoordinate(data);
      }
    }
  }

  onLogoutClick = event => {
    event.preventDefault();

    // clearCurrentProfile();
    // Set profile to null

    // Remove token from localstorage
    localStorage.removeItem('loginJwt');
    // Remove token from axios header
    setAuthToken(false);
    // TODO
    // setCurrentUser({})
  };

  selectDevice = deviceId => {
    const { socket } = this.state;
    const { auth } = this.props;
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
      socket.emit('addDevice', payload);
    } else {
      socket.emit('removeDevice', payload);
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
          <Map deviceAction={deviceAction} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Dashboard.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(Dashboard);
