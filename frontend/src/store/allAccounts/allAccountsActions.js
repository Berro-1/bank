import axios from "axios";
import { allAccountsActions } from "./allAccountsSlice";

export const getAllAccounts = (userId) => async (dispatch) => {
  dispatch(allAccountsActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/accounts/${userId}`;
    const response = await axios.get(url);
    console.log("API response:", response.data); // Log the API response
    dispatch(allAccountsActions.fetchSuccess(response.data));
  } catch (error) {
    console.log("Error fetching accounts:", error);
    if (error.response) {
      dispatch(allAccountsActions.fetchFail(error.response.data));
    } else {
      dispatch(allAccountsActions.fetchFail("Network error or no response"));
    }
  }
};
