import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  submissions: [],
};

const submissionSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.submissions = action.payload;
      state.error = null;
    },
    createSubmissionSuccess: (state, action) => {
      state.loading = false;
      state.submissions = [...state.submissions,action.payload];
      state.error = null;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const submissionsActions = submissionSlice.actions;
export default submissionSlice;
