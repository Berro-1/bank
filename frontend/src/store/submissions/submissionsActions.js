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


export const submitCreditCardDetails = (details, userId) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
      const response = await axios.post(`http://localhost:4000/api/submissions/credit-card/${userId}`, {
          details
      });
      dispatch(submissionsActions.createSubmissionSuccess(response.data));
  } catch (error) {
      console.log(error);
      dispatch(submissionsActions.fetchFail(error.response ? error.response.data : "Network error or no response"));
      toast.error(error.response.data.message, {
        autoClose: 1000,
        theme: "colored",
      });  }
};


export const submitNewAccountDetails = (details, userId) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
    const response = await axios.post(`http://localhost:4000/api/submissions/new-account/${userId}`, {
      details
    });
    dispatch(submissionsActions.createSubmissionSuccess(response.data));
  } catch (error) {
    dispatch(submissionsActions.fetchFail(error.response ? error.response.data : "Network error or no response"));
  }
};


export const getAllSubmissions = (reqType) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/submissions/${reqType}`;
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



export const updateSubmissionStatus = (id, status) => async (dispatch) => {
  dispatch(submissionsActions.fetchRequest());
  try {
    const response = await axios.patch(`http://localhost:4000/api/submissions/${id}`, { status });
    dispatch(getAllSubmissions("credit-card"));  // Assuming you want to refresh both lists
    dispatch(getAllSubmissions("new-account"));
    toast.success("Submission status updated successfully", {
      autoClose: 1000,
      theme: "colored"
    });
  } catch (error) {
    console.error("Error updating submission status:", error);
    dispatch(submissionsActions.fetchFail(error.response.data.error || "Network error or no response"));
    toast.error(error.response.data.error || "Network error or no response", {
      autoClose: 1000,
      theme: "colored"
    });
  }
};
