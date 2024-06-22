import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    updateUserSuccess(state, action) {
      state.status = 'succeeded';
      state.userInfo = action.payload;
    },
    updateUserFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const userActions= userSlice.actions;
export default userSlice;
