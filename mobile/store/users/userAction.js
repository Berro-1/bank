import axios from "axios";
import { userActions } from "./usersSlice";
import {API_URL} from 'react-native-dotenv';

export const updateUser = (id, updates) => async (dispatch) => {
  console.log("updates: ", updates);
  dispatch(userActions.updateUserRequest());
  try {
    const response = await axios.patch(`${API_URL}/api/users/${id}`, updates);
    console.log("res", response);
    dispatch(userActions.updateUserSuccess(response.data));
  } catch (err) {
    dispatch(userActions.updateUserFailure(err.response.data));
  }
};
