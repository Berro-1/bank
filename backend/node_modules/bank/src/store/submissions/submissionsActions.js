import axios from "axios";
import { submissionsActions } from "./submissionsSlice";
import { toast } from 'react-toastify';

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


export const submitNewSubmission = (formDetails, userId) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
    await axios.post(
      `http://localhost:4000/api/submissions/user-submissions/${userId}`,
      {
        ...formDetails,
        user: userId,
        status: 'Pending',
      },
    );
    dispatch(submissionsActions.fetchSuccess());
    toast.success("Submission Added Successfully", {
      autoClose: 1000,
      theme: "colored",
    });
    dispatch(getSubmissions(userId));
  } catch (e) {
    dispatch(submissionsActions.fetchFail(e.response.data));
    toast.error(e.response.data.message, {
      autoClose: 1000,
      theme: "colored",
    });
  }
};