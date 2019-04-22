import React from 'react';

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
          {devices.map((item, index) => {
            return <Device key={item.deviceId} device={item} selectDevice={props.selectDevice} />;
          })}
        </div>
      </ul>
    </nav>
  );
};

export default SideNav;
