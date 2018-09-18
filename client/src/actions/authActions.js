import axios from "axios";
import { GET_ERRORS } from "./types";

// New user object sent to api
// If successful, login is created and
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
