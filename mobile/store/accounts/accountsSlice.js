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
    accountRequest: (state) => {
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
    editAccountSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    accountFail: (state, action) => {
      console.log("Fetch failed with error:", action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    resetAccounts: (state) => {
      state.accounts = [];
      state.error = null;
    },
  },
});

export const accountsActions = allAccountsSlice.actions;
export default allAccountsSlice;
