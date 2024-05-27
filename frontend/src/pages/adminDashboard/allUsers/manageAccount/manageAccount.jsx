import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts, updateAccount, deleteAccount } from '../../../../store/accounts/accountsActions';
import { getAllTransactions } from '../../../../store/Transactions/transactionActions';
import DeleteConfirmationDialog from './ConfirmationDialog';
import TransactionsDialog from './TransactionsDialog '; // New component

const statusOptions = ["Active", "Closed", "Suspended"];

const ManageAccountPage = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.accounts);
  const [status, setStatus] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTransactionsDialog, setOpenTransactionsDialog] = useState(false);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (accounts.length === 0) {
      dispatch(getAllAccounts());
    }
  }, [dispatch, accounts.length]);

  useEffect(() => {
    const account = accounts.find(acc => acc._id === accountId);
    if (account) {
      setStatus(account.status);
    }
  }, [accounts, accountId]);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAccount(accountId, { status }));
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAccount(accountId));
    navigate(-1); // Navigate back to the previous page
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleViewTransactions = () => {
    dispatch(getAllTransactions(accountId)).then((response) => {
      setTransactions(response.data);
      setOpenTransactionsDialog(true);
    });
  };

  const handleCloseTransactionsDialog = () => {
    setOpenTransactionsDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error.message || error}</Typography>;
  }

  const account = accounts.find(acc => acc._id === accountId);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Manage Account
        </Typography>
        {account && (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={status}
                onChange={handleChange}
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained" color="primary">
                Update Status
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Account
              </Button>
              <Button variant="outlined" onClick={handleViewTransactions}>
                View Transactions
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Paper>
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleConfirm={handleConfirmDelete}
      />
      <TransactionsDialog
        open={openTransactionsDialog}
        handleClose={handleCloseTransactionsDialog}
        transactions={transactions}
      />
    </Container>
  );
};

export default ManageAccountPage;
