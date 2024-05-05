import { combineReducers } from "redux";
import TestsSlice from './testing/testReducers'


const RootReducer = combineReducers({
    Tests: TestsSlice.reducer,
});

export default RootReducer;