import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  email: false,
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.email = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice;
