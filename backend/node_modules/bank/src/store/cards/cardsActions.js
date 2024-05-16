import axios from "axios";
import { cardsActions } from "./cardsSlice";

export const getcards = (userId) => async (dispatch) => {
  dispatch(cardsActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/creditCard/${userId}`;
    const response = await axios.get(url);
    dispatch(cardsActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching cards:", error);
    if (error.response) {
      dispatch(cardsActions.fetchFail(error.response.data));
    } else {
      dispatch(cardsActions.fetchFail("Network error or no response"));
    }
  }
};
