import axios from "axios";
import { transfersActions } from "./transfersSlice";
import { toast } from "react-toastify";
import { getAllAccounts } from "../accounts/accountsActions";
import { getCards } from "../cards/cardsActions";
export const createTransfer =
  (accountId, recieverAccountId, amountTransfer,transfer_type_back,userId) => async (dispatch) => {
    dispatch(transfersActions.fetchRequest());
    try {
      const response = await axios.post(
        `http://localhost:4000/api/transaction/${accountId}`,
        {
          transfer_type:transfer_type_back,
          account: accountId,
          receiver_acc: recieverAccountId,
          amount: amountTransfer,
          type: "Transfer",
        }
      );
      dispatch(transfersActions.fetchSuccess(response.data)); // Include response data
      toast.success("Transfer Done Successfully", {
        autoClose: 1000,
        theme: "colored",
      });
      dispatch(getAllAccounts(userId));
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
