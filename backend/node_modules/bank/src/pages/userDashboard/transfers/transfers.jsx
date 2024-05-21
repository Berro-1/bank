import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import { getAllAccounts } from "../../../store/accounts/accountsActions";
import { useSelector, useDispatch } from "react-redux";
import { createTransfer } from "../../../store/transfers/transfersActions";

export default function Transfers() {
  const [accountId, setAccountId] = useState("");
  const [recipientAccountId, setRecipientAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const userId = "6644dcb9c16b269cf9bae998";

  const dispatch = useDispatch();
  const { loading: accountsLoading, accounts } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );
  const { loading: transferLoading, error: transferError } = useSelector(
    (state) => state.transfers || { loading: false, error: null }
  );

  useEffect(() => {
    dispatch(getAllAccounts(userId));
  }, [dispatch, userId]);

  const mappedAccounts = useMemo(() => {
    return accounts
      .filter((account) => account.type !== "Loan")
      .map((account) => (
        <MenuItem key={account._id} value={account._id}>
          {account.type
            ? `${account.type} - ${account._id}`
            : `ID: ${account._id}`}
        </MenuItem>
      ));
  }, [accounts]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!accountId || !recipientAccountId || !amount) {
      setError("All fields are required");
      return;
    }

    setError("");
    dispatch(createTransfer(accountId, recipientAccountId, amount));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            backgroundColor: "white",
            borderRadius: 2,
            border: "2px solid #333",
            boxShadow: 3,
          }}
        >
          <h2 className="text-2xl font-bold text-black md:text-3xl">
            Send Money
          </h2>
          <FormControl fullWidth margin="normal">
            <InputLabel id="accountId-label">Select Account</InputLabel>
            <Select
              labelId="accountId-label"
              id="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              label="Select Account"
            >
              {accounts.length > 0 ? (
                mappedAccounts
              ) : (
                <MenuItem disabled>No accounts available</MenuItem>
              )}
            </Select>
          </FormControl>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              variant="outlined"
              required
              fullWidth
              name="recipientAccountId"
              label="Recipient Account ID"
              type="text"
              id="recipientAccountId"
              autoComplete="recipientAccountId"
              value={recipientAccountId}
              onChange={(e) => setRecipientAccountId(e.target.value)}
              margin="normal"
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              id="amount"
              autoComplete="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {transferError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {transferError}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#000",
                color: "#fff",
                "&:hover": { backgroundColor: "#333" },
              }}
              disabled={transferLoading}
            >
              {transferLoading ? <CircularProgress size={24} /> : "Send"}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

Transfers.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};
