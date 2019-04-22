import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import Navbar from '../layout/Navbar';
import Map from './Map';
import SideNav from './SideNav';

class Dashboard extends Component {
  onLogoutClick = event => {
    event.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <Navbar onLogoutClick={this.onLogoutClick} />
        <div className="content">
          <SideNav />
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
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Dashboard);
