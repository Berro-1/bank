import axios from "axios";
import { transfersActions } from "./transfersSlice";
import { toast } from "react-toastify";

export const createTransfer =
  (accountId, recieverAccountId, amountTransfer,transfer_type_back) => async (dispatch) => {
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
    } catch (e) {
      console.log(e);
      dispatch(
        transfersActions.fetchFail(
          e.response?.data?.error || "An error occurred"
        )
      );
    }
  };
