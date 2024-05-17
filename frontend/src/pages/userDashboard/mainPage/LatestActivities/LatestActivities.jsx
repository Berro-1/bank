import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllTransactions } from "../../../../store/Transactions/transactionActions";
import { styled } from "@mui/material/styles"; // Add this import

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#4727eb', 
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
  backgroundColor: theme.palette.action.hover,
},
'&:hover': {
  backgroundColor: theme.palette.action.selected,
},
}));
const LatestActivities = ({ accountId }) => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector(
    (state) => state.transactions || { transactions: [], loading: false }
  );

  useEffect(() => {
    dispatch(getAllTransactions(accountId));
    console.log('transactions',transactions);
  }, [dispatch, accountId]);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-2xl font-bold pb-8">Latest Activities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} className="rounded-lg shadow-md">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell className="font-semibold">Date</StyledTableCell>
                <StyledTableCell className="font-semibold">Type</StyledTableCell>
                <StyledTableCell className="font-semibold">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <StyledTableRow key={transaction._id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{`$${transaction.amount}`}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </motion.div>
  );
};

export default LatestActivities;
