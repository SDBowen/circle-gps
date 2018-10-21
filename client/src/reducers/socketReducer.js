import { UPDATE_COORDS } from "../actions/types";

const initialState = {
  lastCoords: { lat: 0, lon: 0 }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COORDS:
      return {
        ...state,
        lastCoords: action.payload
      };
    default:
      return state;
  }
}
