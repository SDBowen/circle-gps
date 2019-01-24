// User registration component
// User input is validated and a new user is created
// Errors are set to state if returned

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // State is updated on user input
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // On form submit, user input is validated and sent to user register api
  onSubmit = event => {
    event.preventDefault();

    // New user object from form state
    const newUser = {
      user: this.state.user,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

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
            <form
              className="login-box__form"
              noValidate
              onSubmit={this.onSubmit}
            >
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
              <div className="login-box__password">
                <input
                  type="password"
                  name="password2"
                  placeholder="Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {/* If errors, display to user */}
                {errors.password2 && (
                  <p className="login-box__error">{errors.password2}</p>
                )}
              </div>
              <div className="login-box__submit">
                <input
                  className="login-box__submit-button"
                  type="submit"
                  value="Register  >"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
