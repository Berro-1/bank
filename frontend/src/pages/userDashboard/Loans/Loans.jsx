import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Typography,
  CircularProgress,
  Box,
  Container,
  Paper,
  Button,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import {
  getAllLoans,
  createLoanPayment,
} from "../../../store/Loans/loansActions";
import LoanPaymentDialog from "./LoanPaymentDialog";

const StatusIndicator = styled("span")(({ status }) => ({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: "10px",
  marginRight: "5px",
  backgroundColor:
    status === "Active"
      ? "#4CAF50" // Green
      : status === "Pending"
      ? "#FF9800" // Orange
      : status === "Deleted"
      ? "#F44336" // Red
      : "#F6B000", // Default color (yellow)
}));

const LoansPage = () => {
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector(
    (state) => state.loans || { loans: [], loading: false }
  );
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      const userId = user.id;
      dispatch(getAllLoans(userId));
    }
  }, [dispatch]);

  const handleOpenPaymentDialog = (loan) => {
    setSelectedLoan(loan);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
  };

  const handleConfirmPayment = (loanId, amount, accountId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      const userId = user.id;
      dispatch(createLoanPayment(loanId, amount, accountId, userId));
    }
  };

  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${params.row.amount.toFixed(2)}`,
    },
    {
      field: "interest_rate",
      headerName: "Interest Rate",
      flex: 1,
      renderCell: (params) => `${params.row.interest_rate}%`,
    },
    { field: "loan_term", headerName: "Loan Term", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          <StatusIndicator status={params.row.status} />
          {params.row.status}
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) =>
        params.row.status === "Active" && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleOpenPaymentDialog(params.row)}
          >
            Make Payment
          </Button>
        ),
    },
  ];

  const rows = loans.map((loan) => ({
    id: loan._id,
    type: loan.type,
    amount: loan.amount,
    interest_rate: loan.interest_rate,
    loan_term: loan.loan_term,
    status: loan.status,
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
            Loans
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Paper
              elevation={3}
              sx={{ padding: 4, borderRadius: 2, marginTop: 3 }}
            >
              <div style={{ height: 600, width: "100%" }}>
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

          {selectedLoan && (
            <LoanPaymentDialog
              open={paymentDialogOpen}
              handleClose={handleClosePaymentDialog}
              handlePayment={handleConfirmPayment}
              loan={selectedLoan}
            />
          )}
        </Container>
      </motion.div>
    </div>
  );
};

export default LoansPage;
