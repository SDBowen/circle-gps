import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './components/common/privateRoute';

import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-device" component={CreateProfile} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
