// User login component
// User input is validated and a JWT is returned
// Errors are set to state if returned

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      errors: {}
    };
  }

  // State is updated on user input
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
      login: this.state.login,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
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
          <input type="submit" value="Submit" />
        </form>
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
