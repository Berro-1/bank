import { combineReducers } from "redux";
import TestsSlice from './testing/testReducers';
import transactionSlice from "./Transactions/transactionSlice";
import allAccountsSlice from "./allAccounts/allAccountsSlice";
import cardsSlice from "./cards/cardsSlice";
import loanSlice from "./Loans/loansSlice";
import submissionSlice from "./submissions/submissionsSlice";
const rootReducer = combineReducers({
  Tests: TestsSlice.reducer,
  transactions: transactionSlice.reducer,
  accounts: allAccountsSlice.reducer,
  cards:cardsSlice.reducer,
  loans: loanSlice.reducer,
  submissions: submissionSlice.reducer
});

export default rootReducer;
