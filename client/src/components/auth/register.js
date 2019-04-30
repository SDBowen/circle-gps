// User registration component
// User input is validated and a new user is created
// Errors are set to state if returned

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { user, password, password2 } = this.state;
    const { history } = this.props;

    event.preventDefault();

    const newUser = {
      user,
      password,
      password2
    };

    registerUser(newUser, history);
  };

  render() {
    const { user, password, password2, errors } = this.state;

    return (
      <div>
        <div className="section-login">
          <div className="login-box">
            <div className="login-box__header">
              <div className="login-box__brand">
                <p>Register</p>
              </div>
              <div className="login-box__links-box">
                <div className="login-box__link">
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
            <form className="login-box__form" noValidate onSubmit={this.onSubmit}>
              <div className="login-box__username">
                <input
                  type="text"
                  name="user"
                  placeholder="User Name"
                  value={user}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.user && <p className="login-box__error">{errors.user}</p>}
              </div>
              <div className="login-box__password">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.password && <p className="login-box__error">{errors.password}</p>}
              </div>
              <div className="login-box__password">
                <input
                  type="password"
                  name="password2"
                  placeholder="Password"
                  value={password2}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.password2 && <p className="login-box__error">{errors.password2}</p>}
              </div>
              <div className="login-box__submit">
                <input className="login-box__submit-button" type="submit" value="Register  >" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired
};

export default withRouter(Register);
