import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import {
  getAllLoans,
  createLoanPayment,
} from "../../../store/Loans/loansActions";
import LoanPaymentDialog from "./LoanPaymentDialog";

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

const StatusIndicator = styled("span")(({ status, theme }) => ({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: "10px",
  marginRight: "5px",

  backgroundColor:
    status === "Active"
      ? "#4CAF50" // Green
      : status === "Closed"
      ? "#F44336" // Red
      : "#F6B000", // Default color (yellow)
}));

const userId = "6644dcb9c16b269cf9bae998";

const LoansPage = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector(
    (state) => state.loans || { loans: [], loading: false }
  );
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    dispatch(getAllLoans(userId));
  }, [dispatch]);

  const handleOpenPaymentDialog = (loan) => {
    setSelectedLoan(loan);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };

  const handleConfirmPayment = (loanId, amount, accountId) => {
    dispatch(createLoanPayment(loanId, amount, accountId, userId));
  };

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
          Loans
        </Typography>

        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Interest Rate</StyledTableCell>
                  <StyledTableCell>Loan Term</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan) => (
                  <StyledTableRow key={loan._id}>
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>{`$${loan.amount}`}</TableCell>
                    <TableCell>{`${loan.interest_rate}%`}</TableCell>
                    <TableCell>{loan.loan_term}</TableCell>
                    <TableCell>
                      <StatusIndicator status={loan.status} />
                      {loan.status}
                    </TableCell>
                    <TableCell>
                      {loan.status === "Active" && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenPaymentDialog(loan)}
                        >
                          Make Payment
                        </Button>
                      )}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedLoan && (
          <LoanPaymentDialog
            open={paymentDialogOpen}
            handleClose={handleClosePaymentDialog}
            handlePayment={handleConfirmPayment}
            loan={selectedLoan}
          />
        )}
      </motion.div>
    </div>
  );
};

export default LoansPage;
