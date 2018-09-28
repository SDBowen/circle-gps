import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";

// New user object sent to api
// If successful, user is created and
// page is redirect to login
// Errors are returned and displayed
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => history.push("/login"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Login - Get user token
export const loginUser = userData => dispatch => {
  axios
    // User object sent to api
    .post("/api/user/login", userData)
    .then(res => {
      // Save JWT from response data
      const { token } = res.data;
      // Save JWT to local storage
      localStorage.setItem("loginJwt", token);

      setAuthToken(token);
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    // Return and display errors
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out user
export const logoutUser = () => dispatch => {
  // Remove token from localstorage
  localStorage.removeItem("loginJwt");
  // Remove token from axios header
  setAuthToken(false);
  // Set current user to {}
  dispatch(setCurrentUser({}));
};
