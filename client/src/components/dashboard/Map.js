import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

class Map extends Component {
  selectDevice = event => {
    event.preventDefault();
    console.log(event.target.textContent);
    let payload = {};
    payload.deviceId = this.props.profile.profile.deviceId;
    payload.userId = this.props.profile.profile.user._id;
    socket.emit("addDevice", payload);
  };

  componentDidMount() {
    socket.emit("addUser", this.props.auth.user.id);

    // set up the map
    let map;
    map = new L.Map("mapid");

    // create the tile layer with attribution
    var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    var osmAttrib =
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>';

    var osmTileLayer = new L.TileLayer(osmUrl, {
      attribution: osmAttrib
    });

    // Set map starting point and tile layer
    map.setView(new L.LatLng(32.960066, -96.728388), 9);
    map.addLayer(osmTileLayer);

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

      console.log(`coordsUpdate from client: ${JSON.stringify(data)}`);
    });
  }

  render() {
    return (
      <div>
        <div id="mapid" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Map.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Map);
