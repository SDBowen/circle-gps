import React, { Component } from 'react';

import PropTypes from 'prop-types';

import '../../../node_modules/leaflet/dist/leaflet.css';
import L from 'leaflet';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPins: {},
      map: {}
    };
  }

  componentDidMount() {
    const map = this.buildMap();

    this.setState({ map });
  }

  componentDidUpdate(prevProps, prevState) {
    const { deviceAction } = this.props;
    const { mapPins, map } = this.state;

    if (
      // Check socket data for change
      JSON.stringify(deviceAction) !== JSON.stringify(prevProps.deviceAction)
    ) {
      if (deviceAction.type === 'coords') {
        const { lat } = deviceAction;
        const { lon } = deviceAction;
        const { deviceId } = deviceAction;

        // check for existing map pin
        if (deviceId in mapPins) {
          mapPins[deviceId].setLatLng([lat, lon]);
        } else {
          // Create new pin

          const newDeviceMarker = L.circle([lat, lon], 100, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
          }).addTo(map);

          const pins = { ...mapPins };
          pins[deviceId] = newDeviceMarker;

          this.setState({ mapPins: pins });
        }
      }

      if (deviceAction.type === 'status' && !deviceAction.active) {
        const { deviceId } = deviceAction;
        const mapPin = mapPins[deviceId];

        this.removeMapPin(mapPin, deviceId);
      }
    }
  }

  buildMap = () => {
    // set up the map
    const map = new L.Map('mapid');

    // create the tile layer with attribution
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>';

    const osmTileLayer = new L.TileLayer(osmUrl, {
      attribution: osmAttrib
    });

    // Set map starting point and tile layer
    map.setView(new L.LatLng(41.896151, -87.7349909), 12);
    map.addLayer(osmTileLayer);

    return map;
  };

  removeMapPin = (pin, deviceId) => {
    const { map, mapPins } = this.state;

    if (map.hasLayer(pin)) {
      map.removeLayer(pin);
    }

    const pins = { ...mapPins };
    delete pins[deviceId];

    this.setState({ mapPins: pins });
  };

  render() {
    return <div id="mapid" className="map-view" />;
  }
}

Map.propTypes = {
  deviceAction: PropTypes.func.isRequired
};

export default Map;
