import io from "socket.io-client";

import { UPDATE_COORDS } from "./types";

const socket = io.connect("http://localhost:4000");

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
