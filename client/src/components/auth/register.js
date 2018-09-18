// User registration component
// User input is validated and a new login is created
// Errors are set to state if returned

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { POINT_CONVERSION_UNCOMPRESSED } from "constants";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      password2: "",
      errors: {}
    };
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
      login: this.state.login,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Register</h1>
        <form noValidate onSubmit={this.onSubmit}>
          Login:
          <br />
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={this.state.login}
            onChange={this.onChange}
          />
          {/* If errors, display to user */}
          {errors.login && <p>{errors.login}</p>}
          <br />
          Password:
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          {/* If errors, display to user */}
          {errors.password && <p>{errors.password}</p>}
          <br />
          Confirm Password:
          <br />
          <input
            type="password"
            name="password2"
            placeholder="Password"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {/* If errors, display to user */}
          {errors.password2 && <p>{errors.password2}</p>}
          <br />
          <input type="submit" value="Submit" />
        </form>
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
