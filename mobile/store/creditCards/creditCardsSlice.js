import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  cards: [],
};

const creditCardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.cards = action.payload; // Ensure payload is correctly assigned
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const creditCardsActions = creditCardsSlice.actions;
export default creditCardsSlice;
