import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault;

    // LOGOUT USER
  }

  render() {
    const { isAuthenticated, user } = this.props;

    const authUserLinks = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );

    const noAuthLinks = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );

    return <nav>{isAuthenticated ? authUserLinks : noAuthLinks}</nav>;
  }
}

export default Navbar;
