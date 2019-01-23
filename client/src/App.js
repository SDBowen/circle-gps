import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/privateRoute";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

import { receiveCoordinates } from "./actions/socketActions";

import "./App.scss";

// Initialize socketio listener
receiveCoordinates(store.dispatch);

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
    // Logout user
    store.dispatch(logoutUser());
    // Clear user profile
    store.dispatch(clearCurrentProfile());
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
          <div className="container">
            <div className="App">
              <Navbar {...this.state} />
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-device"
                  component={CreateProfile}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
