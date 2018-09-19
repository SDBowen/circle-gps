// User login component
// User input is validated and a JWT is returned
// Errors are set to state if returned

import React, { Component } from "react";

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

  // On form submit, user input is validated and sent to login api
  // JWT is returned is valid user, error returned if invalid
  onSubmit = event => {
    event.preventDefault();

    // User entered data object
    const loginUser = {
      login: this.state.login,
      password: this.state.password
    };
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

export default Login;
