import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPin: {},
      mainMap: {}
    };
  }
  componentDidMount() {
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
    let initialMap = L.circle([32.160066, -96.128388], 500, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5
    })
      .addTo(map)
      .bindPopup("CTA Blue Line");

    this.setState({ mapPin: initialMap, mainMap: map });
  }

  componentDidUpdate(prevProps) {
    // Update map marker if coordinates have changed
    if (
      JSON.stringify(this.props.socket) !== JSON.stringify(prevProps.socket)
    ) {
      this.state.mapPin.setLatLng([
        this.props.socket.lastCoords.lat,
        this.props.socket.lastCoords.lon
      ]);
      this.state.mainMap.setView(
        [this.props.socket.lastCoords.lat, this.props.socket.lastCoords.lon],
        15
      );
    }
  }

  render() {
    return <div id="mapid" className="map-view" />;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  socket: state.socket
});

Map.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Map);
