import React from 'react';

import { Link } from 'react-router-dom';

import Icon from '../icons';

const Navbar = props => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dk9vbfmw6/image/upload/v1548274709/circlegps-logo.png"
            alt="Logo"
            className="logo__image"
          />
        </Link>
      </div>

      <nav className="user-nav">
        <Link to="/add-device" className="user-nav__icon-box">
          <Icon className="user-nav__icon" name="cog" />
          <span className="user-nav__settings">Settings</span>
        </Link>
        <Link to="/" className="user-nav__icon-box" onClick={props.onLogoutClick}>
          <Icon className="user-nav__icon" name="lock" />
          <span className="user-nav__user-name">Logout</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
