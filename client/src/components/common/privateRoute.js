import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../actions/authActions';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() === true ? <Component {...props} {...rest} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.object).isRequired
};

export default PrivateRoute;
