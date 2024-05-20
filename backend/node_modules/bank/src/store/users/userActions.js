import axios from "axios";
import { userActions } from "./userSlice";

export const getAllUsers = () => async (dispatch) => {
  dispatch(userActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/users`;
    const response = await axios.get(url);
    dispatch(userActions.fetchSuccess(response.data));
    console.log('res',response.data);
  } catch (error) { 
    console.log("Error fetching users:", error);
    if (error.response) {
      dispatch(userActions.fetchFail(error.response.data));
    } else {
      dispatch(userActions.fetchFail("Network error or no response"));
    }
  }
};
