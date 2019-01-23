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
            <img
              src="https://res.cloudinary.com/dk9vbfmw6/image/upload/v1548274709/circlegps-logo.png"
              alt="Logo"
              class="logo__image"
            />
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

    return <div>{isAuthenticated ? authUserLinks : null}</div>;
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
