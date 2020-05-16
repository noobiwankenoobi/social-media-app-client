import {
  SET_SHOUTS,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  LOADING_DATA,
  DELETE_SHOUT,
  POST_SHOUT,
} from "../types";

const initialState = {
  shouts: [],
  shout: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SHOUTS:
      return {
        ...state,
        shouts: action.payload,
        loading: false,
      };
    case LIKE_SHOUT:
    case UNLIKE_SHOUT:
      let index = state.shouts.findIndex(
        (shout) => shout.shoutId === action.payload.shoutId
      );
      state.shouts[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_SHOUT:
      let indexOfDeleted = state.shouts.findIndex(
        (shout) => shout.shoutId === action.payload
      );
      state.shouts.splice(indexOfDeleted, 1);
      return {
        ...state,
      };
    case POST_SHOUT:
      return {
        ...state,
        shouts: [action.payload, ...state.shouts],
      };
    default:
      return state;
  }
}
