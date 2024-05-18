import axios from "axios";
import { submissionsActions } from "./submissionsSlice";

export const getSubmissions = (userId) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/submissions/user-submissions/${userId}`;
    const response = await axios.get(url);
    dispatch(submissionsActions.fetchSuccess(response.data));
    console.log(response);
  } catch (error) {
    console.log("Error fetching submissions:", error);
    if (error.response) {
      dispatch(submissionsActions.fetchFail(error.response.data));
    } else {
      dispatch(submissionsActions.fetchFail("Network error or no response"));
    }
  }
};
