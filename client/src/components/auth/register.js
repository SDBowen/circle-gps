import React, { Component } from "react";
import axios from "axios";

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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      login: this.state.login,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);

    axios
      .post("/api/user/register", newUser)
      .then(res => console.log(res.data))
      .catch(error => this.setState({ errors: error.response.data }));
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
          {errors.password && <p>{errors.password}</p>}
          <br />
          Confirm Password:
          <br />
          <input
            type="text"
            name="password2"
            placeholder="Password"
            value={this.state.password2}
            onChange={this.onChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Register;
