import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccounts } from "../../../store/accounts/accountsActions";

const LoanPaymentDialog = ({ open, handleClose, handlePayment, loan }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      const userId = user.id;
      if (accounts.length === 0) {
        dispatch(getAllAccounts(userId));
      }
    }
  }, [dispatch, accounts.length]);

  const onConfirm = () => {
    if (
      paymentAmount &&
      !isNaN(paymentAmount) &&
      Number(paymentAmount) > 0 &&
      selectedAccount
    ) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.id) {
        const userId = user.id;
        handlePayment(loan.id, selectedAccount, Number(paymentAmount), userId);
        handleClose();
      }
    } else {
      alert("Please enter a valid payment amount and select an account.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Make a Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Loan Amount: ${loan.amount}
          <br />
          Enter the amount you wish to pay towards this loan and select an
          account.
        </DialogContentText>
        <FormControl fullWidth margin="dense">
          <InputLabel id="account-select-label">Account</InputLabel>
          <Select
            labelId="account-select-label"
            id="account-select"
            value={selectedAccount}
            label="Account"
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            {accounts
              .filter((account) => account.type !== "Loan")
              .map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.name} - {account.type} (Balance: ${account.balance})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="paymentAmount"
          label="Payment Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          inputProps={{ min: "0.01", step: "0.01" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanPaymentDialog;
