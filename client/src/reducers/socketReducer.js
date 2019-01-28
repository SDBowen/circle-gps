import {
  UPDATE_COORDS,
  ADD_DEVICE,
  REMOVE_DEVICE,
  STATE_RESET
} from "../actions/types";

const initialState = {
  lastCoords: { lat: 0, lon: 0 },
  addDevice: null,
  removeDevice: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        addDevice: action.payload
      };
    case REMOVE_DEVICE:
      return {
        ...state,
        removeDevice: action.payload
      };
    case STATE_RESET:
      return {
        ...state,
        removeDevice: null,
        addDevice: null
      };
    case UPDATE_COORDS:
      return {
        ...state,
        lastCoords: action.payload
      };
    default:
      return state;
  }
}
