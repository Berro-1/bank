import { combineReducers } from "redux";
import TestsSlice from './testing/testReducers';
import transactionSlice from "./Transactions/transactionSlice";
import loanSlice from "./Loans/loansSlice";

const rootReducer = combineReducers({
  Tests: TestsSlice.reducer,
  transactions: transactionSlice.reducer,
  loans: loanSlice.reducer
});

export default rootReducer;
