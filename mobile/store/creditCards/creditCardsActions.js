import axios from "axios";
import { creditCardsActions } from "./creditCardsSlice";
import { API_URL } from "react-native-dotenv";

export const getCards = (userId) => async (dispatch) => {
  dispatch(creditCardsActions.fetchRequest());
  try {
    const url = `${API_URL}/api/creditCard/${userId}`;
    const response = await axios.get(url);
    dispatch(creditCardsActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching cards:", error);
    if (error.response) {
      dispatch(creditCardsActions.fetchFail(error.response.data));
    } else {
      dispatch(creditCardsActions.fetchFail("Network error or no response"));
    }
  }
};
