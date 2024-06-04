import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../store/users/userActions";
import { getAllAccounts, resetAccounts } from "../../../store/accounts/accountsActions";
import { getAllTransactions } from "../../../store/Transactions/transactionActions";
import TransactionsDialog from "./manageAccount/TransactionsDialog ";
import Sidebar from "../../../components/layout/adminSidebar/adminSidebar"; // Adjust the import path as necessary

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(state => state.users);
  const { accounts, loading: loadingAccounts } = useSelector(state => state.accounts);
  const { transactions, loading: loadingTransactions, error: transactionsError } = useSelector(state => state.transactions || { transactions: [] });
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [openTransactionsDialog, setOpenTransactionsDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (open && selectedUser) {
      dispatch(resetAccounts());
      dispatch(getAllAccounts(selectedUser._id));
    }
  }, [dispatch, selectedUser, open]);

  const handleViewAccounts = (userId) => {
    const user = users.find(user => user._id === userId);
    setSelectedUser(user);
    setOpen(true);
  };

  const handleViewTransactions = async (accountId) => {
    try {
      setSelectedAccountId(accountId);
      await dispatch(getAllTransactions(accountId));
      if (transactions) {
        setOpenTransactionsDialog(true);
      } else {
        alert("No transactions found for this account.");
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleCloseTransactionsDialog = () => {
    setOpenTransactionsDialog(false);
    setSelectedAccountId(null);
  };

  const handleManageAccount = (accountId) => {
    navigate(`/admin/manage-account/${accountId}`);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 1.5, sortable: false },
    { field: "name", headerName: "Name", flex: 1, sortable: true, filterable: true },
    { field: "email", headerName: "Email", flex: 1.5, sortable: true, filterable: true },
    { field: "createdAt", headerName: "Created At", flex: 1, sortable: true, filterable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewAccounts(params.row.id)}
        >
          View Accounts
        </Button>
      ),
    },
  ];

  const rows = users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar/>
      <motion.div
        style={{ flexGrow: 1, padding: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            User Management
          </Typography>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <div style={{ width: "100%" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  checkboxSelection={false}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  loading={loading}
                />
              )}
            </div>
          </Paper>
        </Container>
      </motion.div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: { borderRadius: 4, overflow: "hidden", boxShadow: 5 },
        }}
      >
        <DialogTitle>
          {selectedUser ? `Accounts for ${selectedUser.name}` : "User Accounts"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {loadingAccounts ? (
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
          ) : accounts && accounts.length > 0 ? (
            <List
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 3,
              }}
            >
              {accounts.map((account) => (
                <React.Fragment key={account._id}>
                  <ListItem alignItems="flex-start">
                    <Avatar sx={{ bgcolor: "#1976d2", marginRight: 2 }}>
                      <AccountBalanceIcon />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {account.type}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <strong>ID:</strong> {account._id}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <strong>Balance:</strong> ${account.balance.toFixed(2)}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <strong>Status:</strong> {account.status}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <strong>Created At:</strong> {new Date(account.createdAt).toLocaleDateString()}
                          </Typography>
                          <br />
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 1, mr: 1 }}
                            onClick={() => handleManageAccount(account._id)}
                          >
                            Manage Account
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => handleViewTransactions(account._id)}
                          >
                            View Transactions
                          </Button>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="middle" />
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography>No accounts found for this user.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <TransactionsDialog
        open={openTransactionsDialog}
        handleClose={handleCloseTransactionsDialog}
        transactions={transactions}
        loading={loadingTransactions}
      />
    </Box>
  );
};

export default AdminUsersPage;
