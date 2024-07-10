import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signupUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
  },
});

export const userActions= userSlice.actions;
export default userSlice;
