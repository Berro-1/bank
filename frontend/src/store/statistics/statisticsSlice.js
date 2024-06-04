import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  statistics: [],
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
      state.error = null;
    },
    updatestatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const statisticsActions = statisticsSlice.actions;
export default statisticsSlice;
