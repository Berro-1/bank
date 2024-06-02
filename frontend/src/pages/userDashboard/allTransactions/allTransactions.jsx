import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Typography,
  CircularProgress,
  Box,
  Container,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllTransactions } from "../../../store/Transactions/transactionActions";
import { getAllAccounts } from "../../../store/accounts/accountsActions";
import { getCards } from "../../../store/cards/cardsActions";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";

const AllTransactionsPage = () => {
  const currentUserId = "6644dcb9c16b269cf9bae998";
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state) => state.transactions
  );
  const { accounts } = useSelector((state) => state.accounts);
  const { cards } = useSelector((state) => state.cards);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  useEffect(() => {
    dispatch(getAllAccounts(currentUserId));
    dispatch(getCards(currentUserId));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (selectedAccountId) {
      dispatch(getAllTransactions(selectedAccountId));
    }
  }, [dispatch, selectedAccountId]);

  const handleChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  // Debugging logs
  useEffect(() => {
    console.log("Selected Account ID: ", selectedAccountId);
    console.log("cards: ", cards);
    console.log("Transactions: ", transactions);
    console.log("Accounts: ", accounts);
  }, [selectedAccountId, transactions, accounts]);

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${params.row.amount.toFixed(2)}`,
    },
    { field: "transfer_type", headerName: "Transfer Type", flex: 1 },
    {
      field: "second_account_info",
      headerName: "Second Account Details",
      flex: 2,
      renderCell: (params) => {
        const isSender = params.row.sender === currentUserId;
        const secondAccountUser = isSender
          ? params.row.receiverUser
          : params.row.senderUser;
        return `${secondAccountUser.name || "Unknown"} (${
          isSender ? "Receiver" : "Sender"
        })`;
      },
    },
  ];

  // Ensure transactions are mapped correctly
  const rows = transactions.map((transaction) => ({
    id: transaction._id,
    createdAt: transaction.createdAt,
    amount: transaction.amount,
    transfer_type:
      transaction.sender === currentUserId
        ? transaction.senderTransferType
        : transaction.receiverTransferType,
    sender: transaction.sender,
    receiver: transaction.receiver,
    senderUser: transaction.senderUser,
    receiverUser: transaction.receiverUser,
  }));

  // Check rows mapping
  useEffect(() => {
    console.log("Rows: ", rows);
  }, [rows]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ flexGrow: 1, padding: 20 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="font-bold pt-10"
          >
            <Grid container alignItems="center">
              <Grid item xs>
                All Transactions
              </Grid>
              <Grid item>
                <FormControl
                  variant="outlined"
                  sx={{
                    ml: 2,
                    minWidth: 150,
                    "& .MuiInputLabel-root": {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ffffff",
                      },
                      "& .MuiSelect-icon": {
                        color: "#ffffff",
                      },
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  <InputLabel id="transaction-select-label">
                    Select Account or Card
                  </InputLabel>
                  <Select
                    labelId="transaction-select-label"
                    id="transaction-select"
                    value={selectedAccountId}
                    onChange={handleChange}
                    label="Select Account or Card"
                  >

                    {accounts.map((account) => (
                      <MenuItem key={account._id} value={account._id}>
                        {account.type} - {account.balance}
                      </MenuItem>
                    ))}
                    {cards.map((card) => (
                      <MenuItem key={card._id} value={card._id}>
                        {card.card_name} - {card.credit_limit}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Paper
              elevation={3}
              sx={{ padding: 4, borderRadius: 2, marginTop: 3 }}
            >
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 20, 50]}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  loading={loading}
                />
              </div>
            </Paper>
          )}
        </Container>
      </motion.div>
    </div>
  );
};

export default AllTransactionsPage;
