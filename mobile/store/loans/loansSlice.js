import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loans: [],
  loading: false,
  error: null,
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
      state.loans = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },

    updateLoanSuccess: (state, action) => {
      const index = state.loans.findIndex(
        (loan) => loan._id === action.payload._id
      );
      if (index !== -1) {
        state.loans[index] = action.payload;
      }
      state.loading = false;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const loansActions = loanSlice.actions;
export default loanSlice;
