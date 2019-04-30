// User login component
// User input is validated and a JWT is returned
// Errors are set to state if returned

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import isEmpty from '../../validations/isEmpty';
import setAuthToken from '../../utils/setAuthToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      errors: {},
      isAuthenticated: false
    };
  }

  componentWillMount() {
    if (localStorage.loginJwt) {
      setAuthToken(localStorage.loginJwt);
      const decoded = jwtDecode(localStorage.loginJwt);

      this.setState({ isAuthenticated: !isEmpty(decoded) });
    }
  }

  componentDidMount() {
    const { isAuthenticated } = this.state;
    const { history } = this.props;

    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }

  // State is updated on user input
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On form submit, user input is validated and sent to login api
  // JWT is returned is valid user, error returned if invalid
  onSubmit = event => {
    const { user, password } = this.state;

    event.preventDefault();

    // User entered data object
    const userData = {
      user,
      password
    };

    this.loginUser(userData);
  };

  loginUser = userData => {
    axios
      // User object sent to server
      .post('/api/user/login', userData)
      .then(res => {
        // Save JWT from response data
        const { token } = res.data;
        // Save JWT to local storage
        localStorage.setItem('loginJwt', token);

        window.location.href = '/';
      })
      // Return and display errors
      .catch(error => console.log(error.response));
  };

  demoLogin = event => {
    event.preventDefault();

    // Demo login
    const userData = {
      user: 'demo',
      password: 'password'
    };

    this.loginUser(userData);
  };

  render() {
    const { user, password, errors } = this.state;

    return (
      <div>
        <div className="section-login">
          <div className="login-box">
            <div className="login-box__header">
              <div className="login-box__brand">
                <p>CircleGPS</p>
              </div>
              <div className="login-box__links-box">
                <div className="login-box__link">
                  <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
            <form className="login-box__form" onSubmit={this.onSubmit}>
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
              <div className="login-box__submit">
                <input className="login-box__submit-button" type="submit" value="Login  >" />
              </div>
            </form>
            <div className="demo-login">
              <div className="demo-login__text">
                <p>Just looking around? Login to the demo:</p>
              </div>

              <button type="submit" className="demo-login__button" onClick={this.demoLogin}>
                Demo Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.protoTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Login;
