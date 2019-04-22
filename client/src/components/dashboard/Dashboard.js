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
      devices: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/profile')
      .then(res =>
        this.setState({
          devices: res.data
        })
      )
      .catch(err => console.log(err));

    this.props.addUser(this.props.auth.user.id);
  }

  onLogoutClick = event => {
    event.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  selectDevice = (deviceId, activeStatus) => {
    const payload = {};

    payload.deviceId = deviceId;
    payload.userId = this.props.auth.user.id;

    if (activeStatus) {
      this.props.addDevice(payload);
    } else {
      this.props.removeDevice(payload);
    }
  };

  render() {
    return (
      <div>
        <Navbar onLogoutClick={this.onLogoutClick} />
        <div className="content">
          <SideNav devices={this.state.devices} selectDevice={this.selectDevice} />
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
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addUser, addDevice, removeDevice, logoutUser, clearCurrentProfile }
)(Dashboard);
