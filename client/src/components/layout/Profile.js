import axios from "axios";
import jwt_decode from "jwt-decode";
import isEmpty from "../../validations/isEmpty";

// set axios header with jwt
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    console.log("no token");
  }
};

// decode user detail from jwt
const decoded = jwt_decode(token);
isAuthenticated = !isEmpty(decoded);
// display user
