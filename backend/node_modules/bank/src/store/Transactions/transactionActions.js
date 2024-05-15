import axios from "axios";
import { transactionActions } from "./transactionSlice";

export const getAllTransactions = (accountId) => async (dispatch) => {
  dispatch(transactionActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/transaction/${accountId}`;
    const response = await axios.get(url);
    dispatch(transactionActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) { 
    console.log("Error fetching transactions:", error);
    if (error.response) {
      dispatch(transactionActions.fetchFail(error.response.data));
    } else {
      dispatch(transactionActions.fetchFail("Network error or no response"));
    }
  }
};
