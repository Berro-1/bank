import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const OTPSlice = createSlice({
  name: "OTP",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    requestSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const OTPActions = OTPSlice.actions;
export default OTPSlice.reducer;
