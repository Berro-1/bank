import axios from "axios";
import { accountsActions } from "./accountsSlice";
import { API_URL } from "react-native-dotenv";

export const getAllAccounts = (userId) => async (dispatch) => {
  dispatch(accountsActions.accountRequest());
  try {
    const url = `${API_URL}/api/accounts/${userId}`;
    const response = await axios.get(url);
    console.log("API response:", response.data);
    dispatch(accountsActions.fetchSuccess(response.data));
  } catch (error) {
    console.log("Error fetching accounts:", error);
    if (error.response) {
      dispatch(accountsActions.accountFail(error.response.data));
    } else {
      dispatch(accountsActions.accountFail("Network error or no response"));
    }
  }
};
export const { resetAccounts } = accountsActions;