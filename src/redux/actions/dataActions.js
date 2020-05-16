import {
  SET_SHOUTS,
  LOADING_DATA,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  DELETE_SHOUT,
  POST_SHOUT,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
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

///////////////////
// POST a SHOUT //
/////////////////////////////////////////
export const postShout = (newShout) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/shout", newShout)
    .then((res) => {
      dispatch({
        type: POST_SHOUT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

////////////////////
// LIKE A SHOUT //
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
// UNLIKE A SHOUT //
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
