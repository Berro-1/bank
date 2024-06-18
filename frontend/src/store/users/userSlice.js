import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.users = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
    },
    updateUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
