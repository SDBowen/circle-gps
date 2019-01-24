// User login component
// User input is validated and a JWT is returned
// Errors are set to state if returned

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      errors: {}
    };
  }

  // State is updated on user input
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // On form submit, user input is validated and sent to login api
  // JWT is returned is valid user, error returned if invalid
  onSubmit = event => {
    event.preventDefault();

    // User entered data object
    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

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
                  value={this.state.user}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.user && (
                  <p className="login-box__error">{errors.user}</p>
                )}
              </div>
              <div className="login-box__password">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.password && (
                  <p className="login-box__error">{errors.password}</p>
                )}
              </div>
              <div className="login-box__submit">
                <input
                  className="login-box__submit-button"
                  type="submit"
                  value="Login  >"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
