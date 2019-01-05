import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Map from "./Map";
import SideNav from "./SideNav";

class Dashboard extends Component {
  render() {
    return (
      <div className="content">
        <SideNav />
        <Map />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
