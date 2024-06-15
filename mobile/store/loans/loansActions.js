import axios from "axios";
import { loansActions } from "./loansSlice";
import { getAllAccounts } from "../accounts/accountsActions";
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';

export const getAllLoans = (userId) => async (dispatch) => {
  dispatch(loansActions.fetchRequest());
  try {
    const url = `${API_URL}/api/loan/${userId}`;
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

export const createLoanPayment =
  (loanId, second_account, amount, userId) => async (dispatch) => {
    dispatch(loansActions.fetchRequest()); 
    console.log(loanId, second_account, amount);

    try {
      const url = `${API_URL}/api/loan/pay/${loanId}`; 
      const response = await axios.post(url, {
        amount,
        second_account,
        type: "Loan Payment",
      });
      console.log("userid", userId);
      dispatch(getAllLoans(userId));
      dispatch(getAllAccounts(userId));
      dispatch(loansActions.fetchSuccess(response.data));
      Alert.alert("Success", "Payment Done Successfully", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.log("Error making payment:", error);
      if (error.response) {
        dispatch(loansActions.fetchFail(error.response.data));
      } else {
        dispatch.loansActions.fetchFail("Network error or no response");
      }
      Alert.alert(
        "Error",
        `Payment Failed: ${
          error.response ? error.response.data.mssg : "Unknown error"
        }`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };
