import io from "socket.io-client";

import { UPDATE_COORDS, ADD_DEVICE, REMOVE_DEVICE, STATE_RESET } from "./types";

// localhost or production server
const socket = io.connect("https://intense-everglades-50142.herokuapp.com/");

export const stateReset = () => dispatch => {
  dispatch({
    type: STATE_RESET
  });
};

export const addDevice = deviceData => dispatch => {
  socket.emit("addDevice", deviceData);
  dispatch({
    type: ADD_DEVICE,
    payload: deviceData.deviceId
  });
};

export const removeDevice = deviceData => dispatch => {
  socket.emit("removeDevice", deviceData);
  dispatch({
    type: REMOVE_DEVICE,
    payload: deviceData.deviceId
  });
};

export const addUser = userData => () => {
  socket.emit("addUser", userData);
};

export const receiveCoordinates = dispatch => {
  socket.on("coordsUpdate", payload => {
    dispatch({
      type: UPDATE_COORDS,
      payload: payload
    });
  });
};
