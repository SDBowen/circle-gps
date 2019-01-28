import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stateReset } from "../../actions/socketActions";

import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPins: {},
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
    map.setView(new L.LatLng(32.960066, -96.728388), 5);
    map.addLayer(osmTileLayer);

    this.setState({ mainMap: map });
  }

  componentDidUpdate(prevProps) {
    if (
      // Check socket data for change
      JSON.stringify(this.props.socket) !== JSON.stringify(prevProps.socket)
    ) {
      const lat = this.props.socket.lastCoords.lat;
      const lon = this.props.socket.lastCoords.lon;
      const incomingDeviceId = this.props.socket.lastCoords.id;

      // check for existing map pin
      if (incomingDeviceId in this.state.mapPins) {
        this.state.mapPins[incomingDeviceId].setLatLng([lat, lon]);
      } else {
        // Create new pin

        const newDeviceMarker = L.circle([lat, lon], 100, {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5
        }).addTo(this.state.mainMap);

        this.setState(state => {
          let mapPins = state.mapPins;
          mapPins[incomingDeviceId] = newDeviceMarker;

          return { mapPins };
        });
      }

      if (this.props.socket.removeDevice) {
        const deviceId = this.props.socket.removeDevice;

        this.removeMapPin(deviceId);
      }
    }
  }

  removeMapPin = deviceId => {
    console.log("remove fires");

    this.setState(state => {
      let preMapPins = state.mapPins;

      console.log(`deviceId ${deviceId}`);

      if (preMapPins[deviceId]) {
        this.state.mainMap.removeLayer(preMapPins[deviceId]);
      }

      delete preMapPins[deviceId];

      return { mapPins: preMapPins };
    });

    this.props.stateReset();
  };

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
  profile: PropTypes.object.isRequired,
  stateReset: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { stateReset }
)(Map);
