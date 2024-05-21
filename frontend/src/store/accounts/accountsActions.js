
import axios from "axios";
import { accountsActions } from "./accountsSlice";

export const getAllAccounts = (userId) => async (dispatch) => {
  dispatch(accountsActions.accountRequest());
  try {
    const url = `http://localhost:4000/api/accounts/${userId}`;
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



export const getAccountById = (accountId) => async (dispatch) => {
  dispatch(accountsActions.accountRequest());
  try {
    const url = `http://localhost:4000/api/accounts/singleAccount/${accountId}`;
    const response = await axios.get(url);
    console.log("API response:", response.data);
    dispatch(accountsActions.fetchSuccess(response.data));
  } catch (error) {
    console.log("Error fetching account:", error);
    if (error.response) {
      dispatch(accountsActions.accountFail(error.response.data));
    } else {
      dispatch(accountsActions.accountFail("Network error or no response"));
    }
  }
};
export const updateAccount = (accountId, status, navigate) => async (dispatch) => {
  dispatch(accountsActions.accountRequest());
  try {
    const url = `http://localhost:4000/api/accounts/${accountId}`;
    const response = await axios.patch(url, { status });
    if (response.status === 200) {
      console.log("API response:", response.data);
      dispatch(accountsActions.editAccountSuccess(response.data));
      navigate(-1); // Navigate back upon successful update
    } else {
      console.log("Received unexpected status code:", response.status);
      dispatch(accountsActions.accountFail("Unexpected status code"));
    }
  } catch (error) {
    console.log("Error updating account:", error);
    if (error.response) {
      dispatch(accountsActions.accountFail(error.response.data));
    } else {
      dispatch(accountsActions.accountFail("Network error or no response"));
    }
  }
};


export const deleteAccount = (accountId) => async (dispatch) => {
  dispatch(accountsActions.accountRequest());
  try {
    const url = `http://localhost:4000/api/accounts/${accountId}`;
    await axios.delete(url);
    dispatch(accountsActions.deleteAccountSuccess(accountId));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network error or no response";
    dispatch(accountsActions.accountFail(errorMessage));
  }
};
