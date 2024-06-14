import axios from "axios";
import { transfersActions } from "./transfersSlice";
import { toast } from "react-toastify";
import { getAllAccounts } from "../accounts/accountsActions";
import { getCards } from "../creditCards/creditCardsActions";
import { API_URL } from 'react-native-dotenv';
import { getLatestTransactions } from "../transactions/transactionsActions";
export const createTransfer =
  (accountId, recieverAccountId, amountTransfer, transfer_type_back, userId) =>
  async (dispatch) => {
    dispatch(transfersActions.fetchRequest());
    try {
      const response = await axios.post(
        `${API_URL}/api/transaction/${accountId}`,
        {
          transfer_type: transfer_type_back,
          account: accountId,
          second_account: recieverAccountId,
          amount: amountTransfer,
          type: "Transfer",
        }
      );
      dispatch(transfersActions.fetchSuccess(response.data)); 
      console.log("transfer complete")
      toast.success("Transfer Done Successfully", {
        autoClose: 1000,
        theme: "colored",
      });
      dispatch(getAllAccounts(userId));
      dispatch(getLatestTransactions(accountId));
      dispatch(getCards(userId));
    } catch (e) {
      console.log(e);
      dispatch(
        transfersActions.fetchFail(
          e.response?.data?.error || "An error occurred"
        )
      );
    }
  };
