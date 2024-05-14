import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;  // Ensure payload is correctly assigned
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;
