import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icons';
import Device from './Device';

const SideNav = props => {
  const { devices } = props;

  if (devices === undefined || devices === null) {
    return (
      <nav className="sidebar">
        <ul className="side-nav">
          <li className="">
            <a href="#" className="side-nav__link">
              <Icon className="side-nav__icon" name="target" />
              <span>Devices</span>
            </a>
          </li>
          <div>Loading...</div>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="sidebar">
      <ul className="side-nav">
        <li className="">
          <a href="#" className="side-nav__link">
            <Icon className="side-nav__icon" name="target" />
            <span>Devices</span>
          </a>
        </li>
        <div>
          {Object.keys(devices).map(item => {
            return <Device key={item} device={devices[item]} selectDevice={props.selectDevice} />;
          })}
        </div>
      </ul>
    </nav>
  );
};

SideNav.propTypes = {
  devices: PropTypes.objectOf(PropTypes.object).isRequired,
  selectDevice: PropTypes.func.isRequired
};

export default SideNav;
