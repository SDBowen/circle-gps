import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile;

    // set up the map
    let map;
    map = new L.Map("mapid");

    // create the tile layer with correct attribution
    var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    var osmAttrib =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
      attribution: osmAttrib
    });

    // start the map in South-East England
    map.setView(new L.LatLng(32.960066, -96.728388), 9);
    map.addLayer(osm);

    var circle = L.circle([32.960066, -96.728388], 500, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5
    })
      .addTo(map)
      .bindPopup("I am a circle.");
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      if (Object.keys(profile).length > 0) {
        // Display user profile
        dashboardContent = <h4>Profile will display here</h4>;
      } else {
        // No profile created
        dashboardContent = <h4>Create a profile</h4>;
      }
    }

    return (
      <div>
        <div>{dashboardContent}</div>
        <div id="mapid" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  getCurrentProfile
)(Dashboard);
