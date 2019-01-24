import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Map from "./Map";
import SideNav from "./SideNav";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="content">
          <SideNav />
          <Map />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

Dashboard.propTypes = {};

export default connect(mapStateToProps)(Dashboard);
