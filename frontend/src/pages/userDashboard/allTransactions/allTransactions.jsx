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
    field: "second_account_info",
    headerName: "Second Account Details",
    flex: 2,
    renderCell: (params) => {
      const info = params.row.second_account_info;
      if (!info || info === "Not found") {
        return "N/A";
      }

      // Dynamically display based on the type of second account
      switch (info.type) {
        case "Account":
          // Assuming 'details' object contains a 'user' property for Account
          return `${info.details.user?.name || "Unknown"} - ${
            info.details.type || "unkown account"
          } Account`;
        case "Credit Card":
          // Display card name and the holder's name
          return `${info.details.card_name} - ${
            info.details.user?.name || "Unknown"
          } `;
        case "Loan":
          // Display loan type and the holder's name
          return `${info.details.type} Loan - ${
            info.details.user?.name || "Unknown"
          }`;
        default:
          return "N/A";
      }
    },
  },
];



const rows = transactions.map((transaction) => ({
  id: transaction._id,
  createdAt: transaction.createdAt,
  type: transaction.type,
  amount: transaction.amount,
  transfer_type: transaction.transfer_type,
  account: transaction.account?.user?.name || "Account N/A",
  second_account_info: transaction.second_account_info, // Directly use the detailed object provided from backend
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
