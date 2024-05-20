import { combineReducers } from "redux";
import transactionSlice from "./Transactions/transactionSlice";
import allAccountsSlice from "./allAccounts/allAccountsSlice";
import cardsSlice from "./cards/cardsSlice";
import loanSlice from "./Loans/loansSlice";
import submissionSlice from "./submissions/submissionsSlice";
import transfersSlice from "./transfers/transfersSlice";
import userSlice from "./users/userSlice";

const rootReducer = combineReducers({
  transactions: transactionSlice.reducer,
  accounts: allAccountsSlice.reducer,
  cards:cardsSlice.reducer,
  loans: loanSlice.reducer,
  submissions: submissionSlice.reducer,
  transfers: transfersSlice.reducer
  users: userSlice.reducer,

});

export default rootReducer;
