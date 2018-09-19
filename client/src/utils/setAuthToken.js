import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply token to header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
