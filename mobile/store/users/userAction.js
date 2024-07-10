import axios from "axios";
import { userActions } from "./usersSlice";
import {API_URL} from 'react-native-dotenv';

export const updateUser = (id, updates) => async (dispatch) => {
  console.log("updates: ", updates);
  dispatch(userActions.updateUserRequest());
  try {
    const response = await axios.patch(`${API_URL}/api/users/${id}`, updates);
    console.log("res", response);
    dispatch(userActions.updateUserSuccess(response.data));
  } catch (err) {
    dispatch(userActions.updateUserFailure(err.response.data));
  }
};


export const signupUser = (formData) => async (dispatch) => {
  console.log('111111111111');
  console.log("signup formData: ", formData);
  dispatch(userActions.signupUserRequest());
  
  // Prepare the form data for the multipart request
  const form = new FormData();
  form.append("name", formData.fullName);
  form.append("email", formData.email);
  form.append("password", formData.password);
  form.append("address", formData.address);
  form.append("phone_number", formData.phoneNumber);
  form.append("DOB", formData.DOB);
  
  // Append images if available
  if (formData.selfie) {
    form.append("selfie", {
      uri: formData.selfie,
      name: `selfie.jpg`,
      type: `image/jpeg`,
    });
  }
  if (formData.idFront) {
    form.append("idFront", {
      uri: formData.idFront,
      name: `idFront.jpg`,
      type: `image/jpeg`,
    });
  }
  if (formData.idBack) {
    form.append("idBack", {
      uri: formData.idBack,
      name: `idBack.jpg`,
      type: `image/jpeg`,
    });
  }
  console.log('action',form);

  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("signup response: ", response);
    dispatch(userActions.signupUserSuccess(response.data));
  } catch (err) {
    console.error("signup error: ", err);
    dispatch(userActions.signupUserFailure(err.response.data));
  }
};