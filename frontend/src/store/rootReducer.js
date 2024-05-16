import { combineReducers } from "redux";
import TestsSlice from './testing/testReducers';
import transactionSlice from "./Transactions/transactionSlice";
import allAccountsSlice from "./allAccounts/allAccountsSlice";
import cardsSlice from "./cards/cardsSlice";
import loanSlice from "./Loans/loansSlice";

const rootReducer = combineReducers({
  Tests: TestsSlice.reducer,
  transactions: transactionSlice.reducer,
  accounts: allAccountsSlice.reducer,
  cards:cardsSlice.reducer,
  loans: loanSlice.reducer
});

export default rootReducer;
