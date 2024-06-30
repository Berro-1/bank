import axios from "axios";
import { emailActions } from "./emailSlice";

export const sendEmail = (email, subject, body) => async (dispatch) => {
  dispatch(emailActions.fetchRequest());
  try {
    const url = `http://localhost:4000/api/OTP/sendEmail`;
    // Ensure all data is present before sending the request
    if (!email || !subject || !body) {
      throw new Error("Missing email, subject, or body for sending email.");
    }

    const response = await axios.post(url, {
      to: email, // corrected from `to: to` to `to: email`
      subject: subject,
      text: body,
    });

    dispatch(emailActions.fetchSuccess(response.data));
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      // Capture errors from the server response
      dispatch(emailActions.fetchFail(error.response.data));
      console.error("Error detail:", error.response.data);
    } else {
      // Capture errors that are not part of the HTTP response (network errors, etc.)
      dispatch(
        emailActions.fetchFail("Network error or no response from server")
      );
      console.error("Network error or no response from server");
    }
  }
};
