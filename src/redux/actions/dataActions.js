import {
  SET_SHOUTS,
  LOADING_DATA,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
} from "../types";
import axios from "axios";

/////////////////
// GET SHOUTS //
/////////////////////////////////////
export const getShouts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/shouts")
    .then((res) => {
      dispatch({
        type: SET_SHOUTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SHOUTS,
        payload: [],
      });
    });
};
//////////////////////////////////////////

////////////////////
// LIKE A SCREAM //
////////////////////////////////////////
export const likeShout = (shoutId) => (dispatch) => {
  axios
    .get(`/shout/${shoutId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SHOUT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
///////////////////////////////////////

//////////////////////
// UNLIKE A SCREAM //
////////////////////////////////////////
export const unlikeShout = (shoutId) => (dispatch) => {
  axios
    .get(`/shout/${shoutId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SHOUT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//////////////////////////////////////////

///////////////////
// DELETE SHOUT //
/////////////////
export const deleteShout = (shoutId) => (dispatch) => {
  axios
    .delete(`/shout/${shoutId}`)
    .then(() => {
      dispatch({ type: DELETE_SHOUT, payload: shoutId });
    })
    .catch((err) => console.log(err));
};
/////////////////////////////////////////
