import axios from "axios";
import { RewardsActions } from "./RewardReducers";



export const getRewardsByChallengeId = (challenge_id) => async (dispatch) => {
    dispatch(RewardsActions.fetchRequest());
    try {
        let url = process.env.REACT_APP_API + "/Challenge/getRewardsByChallengeId/"+challenge_id;
        const response = await axios.get(url);
        dispatch(RewardsActions.fetchSuccess(response.data));
    } catch (e) {
        dispatch(RewardsActions.fetchFail(e.response));
    }
};

export const getReward = () => async (dispatch) => {
    dispatch(RewardsActions.fetchRequest());
    try {
        let url = process.env.REACT_APP_API + "/Challenge/getallreward";
        const response = await axios.get(url);
        dispatch(RewardsActions.fetchSuccess(response.data));
    } catch (e) {
        dispatch(RewardsActions.fetchFail(e.response));
    }
};


export const addReward = (id, name, description, type, amount) => async (dispatch) => {
    dispatch(RewardsActions.fetchRequest());
    try {
        await axios.post(process.env.REACT_APP_API + "/reward/create/" + id, {
            name,
            description,
            type,
            amount,
        });
        dispatch(RewardsActions.addRewardSuccess());
        dispatch(getReward());
    } catch (e) {
        dispatch(RewardsActions.fetchFail(e.response.data));
    }
};


export const deleteReward = (id) => async (dispatch) => {
    dispatch(RewardsActions.fetchRequest());
    try {
        await axios.delete(process.env.REACT_APP_API + "/Challenge/deleteReward/" + id);
        dispatch(RewardsActions.deleteRewardSuccess());
        dispatch(getReward());
    } catch (e) {
        dispatch(RewardsActions.fetchFail(e.response.data));
    }
};



export const updateReward = (id, name, description, type, amount) => async (dispatch) => {
    dispatch(RewardsActions.fetchRequest());
    try {
        await axios.put(process.env.REACT_APP_API + "/Challenge/updateReward/" + id, {
            name,
            description,
            type, amount
        });
        dispatch(RewardsActions.editRewardSuccess());
        dispatch(getReward());
    } catch (e) {
        dispatch(RewardsActions.fetchFail(e.response.data));
    }
};


export const clear = () => (dispatch) => {
    dispatch(RewardsActions.clearSuccess());
};
