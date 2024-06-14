import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  transfers: [],
};

const transfersSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.transfers = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice;
