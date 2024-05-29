import axios from "axios";
import { userActions } from "./userSlice";


export const getAllUsers = () => async (dispatch, getState) => {
  dispatch(userActions.fetchRequest());

  // Get the token from the state
  const token = getState().auth.token;

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
