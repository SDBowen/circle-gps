import React from 'react';
import PropTypes from 'prop-types';

const Device = props => {
  const { device, selectDevice } = props;

  return (
    <li className={device.active ? 'side-nav__item side-nav__item--active' : 'side-nav__item'}>
      <a
        href="#"
        className="side-nav__link"
        onClick={event => {
          event.preventDefault();

          selectDevice(device.deviceId);
        }}
      >
        <span>{device.deviceName}</span>
      </a>
    </li>
  );
};

Device.propTypes = {
  device: PropTypes.objectOf(PropTypes.object).isRequired,
  selectDevice: PropTypes.func.isRequired
};

export default Device;
