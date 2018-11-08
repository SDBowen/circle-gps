import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Sidebar extends Component {
  render() {
    return (
      <header className="sidebar">
        <nav className="sidebar__navigation">
          <div />
          <div className="sidebar__logo">Logo</div>
          <div className="sidebar__navigation-items">
            <ul>
              <li>Devices</li>
              <li>Settings</li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Sidebar.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Sidebar);
