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

const LatestActivities = ({ accountId }) => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector(
    (state) => state.transactions || { transactions: [], loading: false }
  );

  useEffect(() => {
    dispatch(getAllTransactions(accountId));
    console.log(transactions); // Optionally log transactions to see what's being loaded
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
                <TableCell className="font-semibold">Date</TableCell>
                <TableCell className="font-semibold">Type</TableCell>
                <TableCell className="font-semibold">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{`$${transaction.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </motion.div>
  );
};

export default LatestActivities;
