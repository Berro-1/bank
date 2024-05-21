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
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { getAllUsers } from "../../../store/users/userActions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getAllAccounts } from "../../../store/accounts/accountsActions";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const {
    accounts,
    loading: loadingAccounts,
    error: accountsError,
  } = useSelector((state) => state.accounts);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleViewAccounts = (userId) => {
    setSelectedUser(users.find((user) => user._id === userId));
    setOpen(true);
    dispatch(getAllAccounts(userId));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleManageAccount = (accountId) => {
    navigate(`/admin/manage-account/${accountId}`);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 1.5, sortable: false },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      filterable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      sortable: true,
      filterable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      sortable: true,
      filterable: true,
    },
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

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
  }));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <motion.div
        style={{ flexGrow: 1, padding: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              User Management
            </Typography>
            <div style={{ width: "100%" }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <DataGrid
                  rows={rows}
                  columns={columns.map((column) => ({
                    ...column,
                    flex:
                      window.innerWidth > 600 ? column.flex : column.flex * 0.8, // Example of dynamic flex
                    hide: window.innerWidth < 600 && column.field === "email", // Hide 'email' on small screens
                  }))}
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
          ) : accounts.length ? (
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
                            <strong>Balance:</strong> $
                            {account.balance.toFixed(2)}
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
                            <strong>Created At:</strong>{" "}
                            {new Date(account.createdAt).toLocaleDateString()}
                          </Typography>
                          <br />
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={() => handleManageAccount(account._id)}
                          >
                            Manage Account
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
    </Box>
  );
};

export default AdminUsersPage;