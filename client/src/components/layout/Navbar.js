import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";

import Icon from "../icons";

class Navbar extends Component {
  onLogoutClick = event => {
    event.preventDefault();

    // LOGOUT USER
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { isAuthenticated } = this.props.auth;

    const authUserLinks = (
      <header className="header">
        <div className="logo">
          <Link to="/">
            <span className="logo__icon" />
            <span className="logo__text">CircleGPS</span>
          </Link>
        </div>

        <nav className="user-nav">
          <Link to="/add-device" className="user-nav__icon-box">
            <Icon className="user-nav__icon" name="cog" />
            <span className="user-nav__settings">Settings</span>
          </Link>
          <Link
            to="/"
            className="user-nav__icon-box"
            onClick={this.onLogoutClick}
          >
            <Icon className="user-nav__icon" name="lock" />
            <span className="user-nav__user-name">Logout</span>
          </Link>
        </nav>
      </header>
    );

    const noAuthLinks = <div />;

    return <nav>{isAuthenticated ? authUserLinks : noAuthLinks}</nav>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.propTypes = {
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
