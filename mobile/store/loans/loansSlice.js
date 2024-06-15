import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  loans: [],
};

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.loans = action.payload;
      state.error = null;
    },
    updateLoanSuccess: (state, action) => {
      state.loading = false;
      state.loans = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const loansActions = loanSlice.actions;
export default loanSlice;
