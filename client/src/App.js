import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.loginJwt) {
  // Set axios header with auth token
  setAuthToken(localStorage.loginJwt);

  // Decode token for user data
  const decoded = jwt_decode(localStorage.loginJwt);

  // Set user and isAuthenticated state
  store.dispatch(setCurrentUser(decoded));

  // Check token expiration
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // Redirect to login screen
    window.location.href = "/login";
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      isAuthenticated: false
    };
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
