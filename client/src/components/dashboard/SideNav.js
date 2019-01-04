import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Icon from "../icons";

class SideNav extends Component {
  render() {
    return (
      <nav className="sidebar">
        <ul className="side-nav">
          <li className="side-nav__item side-nav__item">
            <a href="#" className="side-nav__link">
              <Icon className="user-nav__icon" name="target" />
              <span>Devices</span>
            </a>
          </li>
          <li className="side-nav__item">
            <a href="#" className="side-nav__link">
              {" "}
              <span>Parker</span>{" "}
            </a>
          </li>
          <li className="side-nav__item">
            <a href="#" className="side-nav__link">
              {" "}
              <span>Joans</span>{" "}
            </a>
          </li>
          <li className="side-nav__item side-nav__item--active">
            <a href="#" className="side-nav__link">
              {" "}
              <span>Hoffman</span>{" "}
            </a>
          </li>
          <li className="side-nav__item">
            <a href="#" className="side-nav__link">
              {" "}
              <span>Sommer</span>{" "}
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

SideNav.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SideNav);
