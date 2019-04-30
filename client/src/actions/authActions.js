import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import isEmpty from '../validations/isEmpty';

// New user object sent to server
// If successful, user is created and
// page is redirect to login
// Errors are returned and displayed
export const registerUser = (userData, history) => {
  axios
    .post('/api/user/register', userData)
    .then(res => history.push('/login'))
    .catch(error => {
      console.log(error);
    });
};

export const isAuthenticated = () => {
  if (localStorage.loginJwt) {
    // Set axios header with auth token
    setAuthToken(localStorage.loginJwt);

    // Decode token for user data
    const decoded = jwtDecode(localStorage.loginJwt);

    // Set user and isAuthenticated state
    return !isEmpty(decoded);
  }
};

// Login - Get user token
export const loginUser = userData => {
  axios
    // User object sent to server
    .post('/api/user/login', userData)
    .then(res => {
      // Save JWT from response data
      const { token } = res.data;
      // Save JWT to local storage
      localStorage.setItem('loginJwt', token);

      // Set axios auth headers
      setAuthToken(token);

      // Decode token to retreive user detail
      const decoded = jwtDecode(token);

      // Set current user
      setCurrentUser(decoded);
    })
    // Return and display errors
    .catch(error => {
      console.log(error);
    });
};

export const setCurrentUser = decoded => {
  return decoded;
};

// Log out user
export const logoutUser = () => {
  // Remove token from localstorage
  localStorage.removeItem('loginJwt');
  // Remove token from axios header
  setAuthToken(false);
  // Set current user to empty object
  setCurrentUser({});
};
