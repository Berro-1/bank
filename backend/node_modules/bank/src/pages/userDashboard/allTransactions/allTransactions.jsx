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
import { getAllLoans } from "../../../store/Loans/loansActions";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";

const AllTransactionsPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
    }
  }, []);

  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(
    (state) => state.transactions
  );
  const { accounts } = useSelector((state) => state.accounts);
  const { cards } = useSelector((state) => state.cards);
  const { loans } = useSelector((state) => state.loans);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(getAllAccounts(userId));
      dispatch(getCards(userId));
      dispatch(getAllLoans(userId));
    }
  }, [dispatch, userId]);

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
    console.log("Loans: ", loans);
  }, [selectedAccountId, transactions, accounts, loans]);

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
    {
      field: "transfer_type",
      headerName: "Transfer Type",
      flex: 1,
      renderCell: (params) => {
        const isSender = params.row.sender === selectedAccountId;
        return isSender
          ? params.row.senderTransferType
          : params.row.receiverTransferType;
      },
    },
    {
      field: "second_account_info",
      headerName: "Second Account Details",
      flex: 2,
      renderCell: (params) => {
        const isSender = params.row.sender === selectedAccountId;
        const secondAccountUser = isSender
          ? params.row.receiverUser
          : params.row.senderUser;
        return `${secondAccountUser.name || "Unknown"} (${
          isSender ? "Receiver" : "Sender"
        })`;
      },
    },
  ];

  const activeLoans = loans.filter((loan) => loan.status === "Active");

  const rows = transactions.map((transaction) => ({
    id: transaction._id,
    createdAt: transaction.createdAt,
    amount: transaction.amount,
    transfer_type:
      transaction.sender === selectedAccountId
        ? transaction.senderTransferType
        : transaction.receiverTransferType,
    sender: transaction.sender,
    receiver: transaction.receiver,
    senderUser: transaction.senderUser,
    receiverUser: transaction.receiverUser,
  }));

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
                    minWidth: 215,
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
                      backgroundColor: "#1F2937",
                    },
                  }}
                >
                  <InputLabel id="transaction-select-label">
                    Select Account or Loan
                  </InputLabel>
                  <Select
                    labelId="transaction-select-label"
                    id="transaction-select"
                    value={selectedAccountId}
                    onChange={handleChange}
                    label="Select Account, Card, or Loan"
                    sx={{
                      color: "#ffffff",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ffffff",
                      },
                      ".MuiSelect-icon": {
                        color: "#ffffff",
                      },
                      backgroundColor: "#1F2937",
                      ".MuiList-root": {
                        backgroundColor: "#1F2937",
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "#1F2937",
                        },
                      },
                    }}
                  >
                    {accounts.map((account) => (
                      <MenuItem
                        key={account._id}
                        value={account._id}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1F2937",
                          "&:hover": {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        {account.type} - ${account.balance}
                      </MenuItem>
                    ))}
                    {cards.map((card) => (
                      <MenuItem
                        key={card._id}
                        value={card._id}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1F2937",
                          "&:hover": {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        {card.card_name} - ${card.credit_limit}
                      </MenuItem>
                    ))}
                    {activeLoans.map((loan) => (
                      <MenuItem
                        key={loan._id}
                        value={loan._id}
                        sx={{
                          color: "#ffffff",
                          backgroundColor: "#1F2937",
                          "&:hover": {
                            backgroundColor: "#374151",
                          },
                        }}
                      >
                        {loan.type} - ${loan.amount}
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
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          ) : (
            <Paper style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Paper>
          )}
        </Container>
      </motion.div>
    </div>
  );
};

export default AllTransactionsPage;
