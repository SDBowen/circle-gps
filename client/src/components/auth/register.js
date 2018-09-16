import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const newUser = {
      login: this.state.login,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          Login:
          <br />
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={this.state.login}
            onChange={this.onChange}
            required
          />
          <br />
          Password:
          <br />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            required
          />
          <br />
          Confirm Password:
          <br />
          <input
            type="text"
            name="password2"
            placeholder="Password"
            value={this.state.password2}
            onChange={this.onChange}
            required
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
