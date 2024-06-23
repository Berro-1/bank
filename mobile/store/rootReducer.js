import { combineReducers } from "redux";
import transactionSlice from "./transactions/transactionSlice";
import accountsSlice from "./accounts/accountsSlice";
import creditCardsSlice from "./creditCards/creditCardsSlice";
import loanSlice from "./loans/loansSlice";
import submissionSlice from "./submissions/submissionsSlice";
import userSlice from "./users/usersSlice";
import OTPSlice from "./OTP/OTPSlice";

const rootReducer = combineReducers({
  transactions: transactionSlice.reducer,
  accounts: accountsSlice.reducer,
  cards: creditCardsSlice.reducer,
  loans: loanSlice.reducer,
  loans: loanSlice.reducer,
  submissions: submissionSlice.reducer,
  users: userSlice.reducer,
  OTP:OTPSlice.reducer,

});

export default rootReducer;
