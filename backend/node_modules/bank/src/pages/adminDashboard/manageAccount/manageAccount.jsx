import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAccounts, updateAccount, deleteAccount } from '../../../store/accounts/accountsActions';

const ManageAccountPage = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.accounts);
  const [status, setStatus] = useState('');

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
    dispatch(updateAccount(accountId, status,navigate ));
  };

  const handleDelete = () => {
    dispatch(deleteAccount(accountId));
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
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
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={status}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="submit" variant="contained" color="primary">
                Update Status
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Account
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ManageAccountPage;
