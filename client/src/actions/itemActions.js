import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = (user_id) => (dispatch) => {
  dispatch(setItemLoading());
  axios
    .get(`/api/items/${user_id}`)
    .then((res) => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item) => (dispatch, getState) => {
  console.log("item", item);
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (user_id, id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${user_id}/${id}`,  tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
