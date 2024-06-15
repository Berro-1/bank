import { combineReducers } from "redux";
import transactionSlice from "./transactions/transactionSlice";
import accountsSlice from "./accounts/accountsSlice";
import creditCardsSlice from "./creditCards/creditCardsSlice";
import loanSlice from "./loans/loansSlice";

import submissionSlice from "./submissions/submissionsSlice";
// import transfersSlice from "./transfers/transfersSlice";
// import userSlice from "./users/userSlice";
// import authSlice from "./auth/authSlice";
// import statisticsSlice from "./statistics/statisticsSlice";

const rootReducer = combineReducers({
  transactions: transactionSlice.reducer,
  accounts: accountsSlice.reducer,
  cards: creditCardsSlice.reducer,
  loans: loanSlice.reducer,
  loans: loanSlice.reducer,
  submissions: submissionSlice.reducer,
//   transfers: transfersSlice.reducer,
//   users: userSlice.reducer,
//   auth: authSlice.reducer,
//   statistics: statisticsSlice.reducer,
});

export default rootReducer;
