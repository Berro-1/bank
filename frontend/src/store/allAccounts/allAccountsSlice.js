import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  accounts: [],
};

const allAccountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      console.log("Fetch request started");
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      console.log("Fetch success with data:", action.payload);
      state.loading = false;
      state.accounts = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      console.log("Fetch failed with error:", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const allAccountsActions = allAccountsSlice.actions;
export default allAccountsSlice;
