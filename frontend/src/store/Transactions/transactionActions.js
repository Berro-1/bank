import axios from "axios";
import { transactionActions } from "./transactionSlice";

export const getLatestTransactions = (accountId) => async (dispatch) => {
  dispatch(transactionActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/transaction/latest/${accountId}`;
    const response = await axios.get(url);
    dispatch(transactionActions.fetchSuccess(response.data));
  } catch (error) {
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.data.error === "No transactions found for this account"
    ) {
      // Dispatch empty transactions when there are no transactions found
      dispatch(transactionActions.fetchSuccess([])); // Treat no transactions as an empty state, not an error
    } else {
      const errorMessage = error.response
        ? error.response.data
        : "Network error or no response";
      dispatch(transactionActions.fetchFail(errorMessage));
    }
    console.error("Error fetching latest transactions:", error);
  }
};

export const getAllTransactions = (accountId) => async (dispatch) => {
  dispatch(transactionActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/transaction/${accountId}`;
    const response = await axios.get(url);
    dispatch(transactionActions.fetchSuccess(response.data));
  } catch (error) {
    if (
      error.response &&
      error.response.status === 404 &&
      error.response.data.error === "No transactions found for this account"
    ) {
      // Dispatch empty transactions when there are no transactions found
      dispatch(transactionActions.fetchSuccess([]));
    } else {
      const errorMessage = error.response
        ? error.response.data
        : "Network error or no response";
      dispatch(transactionActions.fetchFail(errorMessage));
    }
    console.error("Error fetching all transactions:", error);
  }
};
