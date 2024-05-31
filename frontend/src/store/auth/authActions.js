import axios from "axios";
import { authActions } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Async thunks for authentication
export const login =
  ({ email, password },navigate) =>
  async (dispatch) => {
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      dispatch(authActions.loginSuccess(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (response.data.user.role == "user") {
        navigate("/mainPage");
      } else if (response.data.user.role == "admin") {
        navigate("/admin/dashboard");
      }
      toast.success("Login successful");
    } catch (err) {
      console.log(err);
      dispatch(authActions.loginFail(err.message));
      toast.error(err.message || "Login failed");
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
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
