import axios from "axios";
import { userActions } from "./userSlice";

export const getAllUsers = () => async (dispatch) => {
  dispatch(userActions.fetchRequest());

  // Get the token from the state
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(userActions.fetchFail("No token found, please log in."));
    return;
  }

  try {
    const response = await axios.get("http://localhost:4000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(userActions.fetchSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(userActions.fetchFail(error.response.data));
    } else {
      dispatch(userActions.fetchFail("Network error or no response"));
    }
  }
};

export const getPendingUsers = () => async (dispatch) => {
  dispatch(userActions.fetchRequest());

  try {
    const response = await axios.get("http://localhost:4000/api/auth/pending");
    dispatch(userActions.fetchSuccess(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(userActions.fetchFail(error.response.data));
    } else {
      dispatch(userActions.fetchFail("Network error or no response"));
    }
  }
};

export const updatePendingUsers = (id, status) => async (dispatch) => {
  dispatch(userActions.fetchRequest());
  console.log(id, status);
  try {
    const response = await axios.patch(
      `http://localhost:4000/api/auth/pending/${id}`,
      { status }
    );
    dispatch(userActions.updateUsersSuccess(response.data));
    dispatch(getPendingUsers());
  } catch (error) {
    console.log("Error updating user:", error);
    if (error.response) {
      dispatch(userActions.fetchFail(error.response.data));
    } else {
      dispatch(userActions.fetchFail("Network error or no response"));
    }
  }
};
