import axios from "axios";
import { loansActions } from "./loansSlice";
import { getAllAccounts } from "../accounts/accountsActions";
import { toast } from "react-toastify";

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

export const updateLoan = (loanId, status) => async (dispatch) => {
  dispatch(loansActions.fetchRequest());
  try {
    const response = await axios.patch(`http://localhost:4000/api/loan/${loanId}`, { status });
    dispatch(loansActions.updateLoanSuccess(response.data));
    dispatch(getAllLoansAdmin());
  } catch (error) {
    console.log("Error updating loan:", error);
    if (error.response) {
      dispatch(loansActions.fetchFail(error.response.data));
    } else {
      dispatch(loansActions.fetchFail("Network error or no response"));
    }
  }
};

export const createLoanPayment =
  (loanId, second_account, amount, userId) => async (dispatch) => {
    dispatch(loansActions.fetchRequest()); // Assuming you manage loading state with this action
          console.log(loanId, second_account, amount);

    try {
      const url = `http://localhost:4000/api/loan/pay/${loanId}`; // Update the endpoint as necessary
      const response = await axios.post(url, {
        amount,
        second_account,
        type: "Loan Payment",
      });
      console.log('ac',userId);
      dispatch(getAllLoans(userId));
      dispatch(getAllAccounts(userId));
      toast.success("Payment Done Successfully", {
        autoClose: 1000,
        theme: "colored",
      });
      dispatch(loansActions.fetchSuccess(response.data))
    } catch (error) {
      console.log("Error making payment:", error);
      if (error.response) {
        dispatch(loansActions.fetchFail(error.response.data));
      } else {
        dispatch.loansActions.fetchFail("Network error or no response");
      }
      toast.error(`Payment Failed: ${error.response.data.mssg}`, {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
