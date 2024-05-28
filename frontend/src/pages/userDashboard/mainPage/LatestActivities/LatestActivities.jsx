import React, { useEffect, useState } from "react";
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
import { getLatestTransactions } from "../../../../store/Transactions/transactionActions";
import { styled } from "@mui/material/styles";
import CustomizedMenu from "./CustomizedMenu";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#4727eb",
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const LatestActivities = ({ accountId, onAccountSelect }) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const loading = useSelector((state) => state.transactions.loading);
  const [hasNoTransactions, setHasNoTransactions] = useState(false);

  useEffect(() => {
    if (accountId) {
      dispatch(getLatestTransactions(accountId))
        .then((action) => {
          if (action.payload && action.payload.length === 0) {
            setHasNoTransactions(true);
          } else {
            setHasNoTransactions(false);
          }
        })
        .catch(() => {
          setHasNoTransactions(false);
        });
    } else {
      setHasNoTransactions(false);
    }
  }, [accountId, dispatch]);

  useEffect(() => {
    if (!accountId) {
      setHasNoTransactions(true);
    } else {
      setHasNoTransactions(false);
    }
  }, [accountId]);

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex justify-between items-center pb-8">
        <h2 className="text-2xl font-bold">Latest Activities</h2>
        <CustomizedMenu onAccountSelect={onAccountSelect} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : !accountId || hasNoTransactions ? (
        <p>No transactions available for this account.</p>
      ) : transactions.length > 0 ? (
        <TableContainer component={Paper} className="rounded-lg shadow-md">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Transfer Type</StyledTableCell>
                <StyledTableCell>Account</StyledTableCell>
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
                  <TableCell>{transaction.transfer_type}</TableCell>
                  <TableCell>{transaction.receiver_acc}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No transactions available for this account.</p>
      )}
    </motion.div>
  );
};

export default LatestActivities;
