import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    Rewards: [],
};

const TestsSlice = createSlice({
    name: "Rewards",
    initialState,
    reducers: {
        fetchRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.Rewards = action.payload;
        },
        addRewardSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        deleteRewardSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        editRewardSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        clearSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
        },

        fetchFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const RewardsActions = TestsSlice.actions;
export default TestsSlice;
