import axios from "axios";
import { loansActions } from "./loansSlice";

export const getAllLoans = (userId) => async (dispatch) => {
  dispatch(loansActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/loan/${userId}`;
    const response = await axios.get(url);
    dispatch(loansActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) { 
    console.log("Error fetching loans:", error);
    if (error.response) {
      dispatch(loansActions.fetchFail(error.response.data));
    } else {
      dispatch(loansActions.fetchFail("Network error or no response"));
    }
  }
};
export const getAllLoansAdmin = () => async (dispatch) => {
  dispatch(loansActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/loan`;
    const response = await axios.get(url);
    dispatch(loansActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) { 
    console.log("Error fetching loans:", error);
    if (error.response) {
      dispatch(loansActions.fetchFail(error.response.data));
    } else {
      dispatch(loansActions.fetchFail("Network error or no response"));
    }
  }
};

export const updateLoan = (userId, status) => async (dispatch) => {
  dispatch(loansActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/loan/${userId}`;
    const response = await axios.patch(url, { status });
    dispatch(loansActions.updateLoanSuccess(response.data));
  } catch (error) {
    console.log("Error updating loan:", error);
    if (error.response) {
      dispatch(loansActions.fetchFail(error.response.data));
    } else {
      dispatch(loansActions.fetchFail("Network error or no response"));
    }
  }
};