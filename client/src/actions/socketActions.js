import io from "socket.io-client";

import { UPDATE_COORDS } from "./types";

// localhost or production server
const socket = io.connect("https://intense-everglades-50142.herokuapp.com/");
// debugging
socket.on("connect", function() {
  console.log("connect event");
});
socket.on("connect_error", function() {
  console.log("connect error");
});

export const addDevice = deviceData => () => {
  socket.emit("addDevice", deviceData);
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
