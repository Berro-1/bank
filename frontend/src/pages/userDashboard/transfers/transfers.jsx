import React, { useState, useEffect, useMemo } from "react";
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
} from "@mui/material";
import Sidebar from "../../../components/layout/hero/Sidebar";
import { getAllAccounts } from "../../../store/allAccounts/allAccountsActions";
import { useSelector, useDispatch } from "react-redux";

export default function Transfers() {
  const [accountId, setAccountId] = useState("");
  const [recipientAccountId, setRecipientAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const userId = "6644dcb9c16b269cf9bae998";

  const dispatch = useDispatch();
  const { loading, accounts } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );

  useEffect(() => {
    dispatch(getAllAccounts(userId));
  }, [dispatch, userId]);

  const mappedAccounts = useMemo(() => {
    return accounts
      .filter((account) => account.type !== "Loan")
      .map((account) => {
        console.log("Account item:", account); // Log account items
        return (
          <MenuItem key={account._id} value={account._id}>
            {account.type
              ? `${account.type} - ${account._id}`
              : `ID: ${account._id}`}
          </MenuItem>
        );
      });
  }, [accounts]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!accountId || !recipientAccountId || !amount) {
      setError("All fields are required");
      return;
    }

    setError("");

    console.log(
      `Sending ${amount} from account ID: ${accountId} to account ID: ${recipientAccountId}`
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Container component="main" maxWidth="xs" className="mt-16">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "2px  #333",
          }}
          className="shadow-lg"
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
            sx={{ mt: 2 }} // Adjusted margin to fix the gap
            className="w-full"
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
              <Alert severity="error" className="mt-2">
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mt-3 mb-2"
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
