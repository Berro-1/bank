import axios from "axios";
import { statisticsActions } from "./statisticsSlice";
import { toast } from "react-toastify";

export const getAlluserTransactions = (userId) => async (dispatch) => {
  dispatch(statisticsActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/statistics/${userId}`;
    const response = await axios.get(url);
    dispatch(statisticsActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching Transactions:", error);
    if (error.response) {
      dispatch(statisticsActions.fetchFail(error.response.data));
    } else {
      dispatch(statisticsActions.fetchFail("Network error or no response"));
    }
  }
};
