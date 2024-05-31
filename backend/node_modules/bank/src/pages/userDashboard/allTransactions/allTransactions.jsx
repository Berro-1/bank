import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Typography, CircularProgress, Box, Container, Paper 
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getAllTransactions } from '../../../store/Transactions/transactionActions';
import Sidebar from '../../../components/layout/Sidebar/Sidebar';

const AllTransactionsPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(getAllTransactions("664f0538ee2114220f466c01"));
  }, [dispatch]);

const columns = [
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    renderCell: (params) => new Date(params.row.createdAt).toLocaleDateString(),
  },
  { field: "type", headerName: "Type", flex: 1 },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    renderCell: (params) => `$${params.row.amount.toFixed(2)}`,
  },
  { field: "transfer_type", headerName: "Transfer Type", flex: 1 },
  {
    field: "account",
    headerName: "Account Holder",
    flex: 1,
    renderCell: (params) => params.row.account?.user?.name || "Account N/A",
  },
  {
    field: "second_account",
    headerName: "Second Account Holder",
    flex: 2,
    renderCell: (params) => {
      // Check if the second_account object contains a user object with a name property
      if (
        params.row.second_account &&
        params.row.second_account.user &&
        params.row.second_account.user.name
      ) {
        return params.row.second_account.user.name;
      } else if (params.row.second_account) {
        // This handles cases where second_account is not populated with a user object
        return `ID: ${
          params.row.second_account._id || params.row.second_account
        }`;
      }
      return "N/A"; // Default display when no second_account data is available
    },
  },
];



const rows = transactions.map(transaction => ({
  id: transaction._id,
  createdAt: transaction.createdAt,
  type: transaction.type,
  amount: transaction.amount,
  transfer_type: transaction.transfer_type,
  account: transaction.account, // This should already include the necessary user details if populated
  second_account: transaction.second_account, // Ensure this includes any details necessary
}));



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
            All Transactions
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginTop: 3 }}>
              <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10, 20, 50]}
                  slots={{
                    toolbar: GridToolbar,
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
