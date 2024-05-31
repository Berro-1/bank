import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAllTransactions } from "../../../store/Transactions/transactionActions";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";

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

const AllTransactionsPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getAllTransactions("664f0538ee2114220f466c01"));
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 20, flexGrow: 1 }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="font-bold pt-10"
        >
          All Transactions
        </Typography>

        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>transfer_type</StyledTableCell>
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
                    <TableCell>{transaction.second_account}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>
    </div>
  );
};

export default AllTransactionsPage;
