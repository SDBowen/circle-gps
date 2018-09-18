import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import jwt_decode from "jwt-decode";
import isEmpty from "./validations/isEmpty";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      isAuthenticated: false
    };
  }

  // Check for auth token in local storage
  checkForActiveToken = () => {
    if (localStorage.loginJwt) {
      const decoded = jwt_decode(localStorage.loginJwt);
      const isAuthenticated = !isEmpty(decoded);

      if (isAuthenticated) {
        this.setState({
          user: decoded.name,
          isAuthenticated: isAuthenticated
        });
      }
    }
  };

  componentDidMount() {
    this.checkForActiveToken();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar {...this.state} />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
