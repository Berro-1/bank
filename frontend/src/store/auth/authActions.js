import axios from "axios";
import { authActions } from "./authSlice";

// Async thunks for authentication
export const login = ({ email, password }) => async (dispatch) => {
  try {
    console.log(email, password);
    const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });
    dispatch(authActions.loginSuccess(response.data));
    localStorage.setItem("token", response.data.token); 
    localStorage.setItem("user", JSON.stringify(response.data.user));
    

  } catch (err) {
    console.log(err);
    dispatch(authActions.loginFail(err.message)); // Assuming you have a loginFail action
  }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("user")
    dispatch(authActions.logout());
  };

// export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
//     try {
//         const response = await axios.post('/api/auth/signup', userData);
//         return response.data;  // Assuming signup also logs the user in and returns token
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// });
