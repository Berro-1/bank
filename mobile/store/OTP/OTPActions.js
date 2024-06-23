import axios from "axios";
import { OTPActions } from "./OTPSlice";
import { API_URL } from "react-native-dotenv";

export const sendOTP = (email) => async (dispatch) => {
  dispatch(OTPActions.requestStart());
  try {
    const url = `${API_URL}/api/OTP/send-otp`;
    const response = await axios.post(url, { email });
    if (response.data.success) {
      dispatch(OTPActions.requestSuccess());
    } else {
      dispatch(OTPActions.requestFail(response.data.message));
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    dispatch(
      OTPActions.requestFail(error.response?.data.message || "Network error")
    );
  }
};

export const verifyOTP = (email, otpCode) => async (dispatch) => {
  dispatch(OTPActions.requestStart());
  try {
    const url = `${API_URL}/api/OTP/verify-otp`;
    const response = await axios.post(url, { email, otpCode });
    if (response.data.success) {
      dispatch(OTPActions.requestSuccess());
    } else {
      dispatch(OTPActions.requestFail(response.data.message));
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    dispatch(
      OTPActions.requestFail(error.response?.data.message || "Network error")
    );
  }
};

