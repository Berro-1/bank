import { combineReducers } from "redux";
import TestsSlice from './testing/testReducers';
import transactionSlice from "./Transactions/transactionSlice";
import allAccountsSlice from "./allAccounts/allAccountsSlice";

const rootReducer = combineReducers({
  Tests: TestsSlice.reducer,
  transactions: transactionSlice.reducer,
  accounts: allAccountsSlice.reducer
});

export default rootReducer;
