import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";

import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

class Dashboard extends Component {
  selectDevice = event => {
    event.preventDefault();
    console.log(event.target.textContent);
    socket.emit("addDevice", this.props.profile.profile.deviceId);
  };

  componentDidMount() {
    this.props.getCurrentProfile();

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

    // Set initial pin on map
    var circle = L.circle([32.960066, -96.728388], 500, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5
    })
      .addTo(map)
      .bindPopup("I am a circle.");

    socket.on("coordsUpdate", data => {
      const lat = data.lat;
      const lng = data.lon;
      circle.setLatLng([lat, lng]);

      console.log(JSON.stringify(data));
    });
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
        dashboardContent = (
          <div>
            <h4>Hello {user.name}!</h4>
            <p>Tracking device:</p>
            <button onClick={this.selectDevice}>{profile.deviceId}</button>
          </div>
        );
      } else {
        // No profile created
        dashboardContent = (
          <div>
            <Link to="/create-profile">
              <h4>Create a profile</h4>
            </Link>
          </div>
        );
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
  { getCurrentProfile }
)(Dashboard);
