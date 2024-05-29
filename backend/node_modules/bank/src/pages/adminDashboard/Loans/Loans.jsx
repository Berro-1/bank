import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  getAllLoansAdmin,
  updateLoan,
} from "../../../store/Loans/loansActions";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";
import { motion } from "framer-motion";

const LoansPage = () => {
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector(
    (state) => state.loans || { loans: [] }
  );
  const [loanId, setLoanId] = useState(null);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllLoansAdmin());
  }, [dispatch]);

  useEffect(() => {
    console.log("Loans:", loans);
  }, [loans]);

  const handleEditClick = (loanId, currentStatus) => {
    setLoanId(loanId);
    console.log(loanId, currentStatus);
    setStatus(currentStatus);
    setOpen(true);
    console.log(loanId);
  };
  const handleSaveClick = (loanId, status) => {
    console.log("12", status);
    dispatch(updateLoan(loanId, status));
    setOpen(false);
    setLoanId(null);
    setStatus("");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setLoanId(null);
    setStatus("");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error.message || error}</Typography>;
  }

  const rows = loans
    ? loans.map((loan) => ({
        id: loan._id,
        type: loan.type,
        amount: loan.amount,
        interest_rate: loan.interest_rate,
        loan_term: loan.loan_term,
        status: loan.status,
        user: loan.user,
      }))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "interest_rate", headerName: "Interest Rate", width: 150 },
    { field: "loan_term", headerName: "Loan Term", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params?.row?.id, params?.row?.status)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <motion.div
        style={{ flexGrow: 1, padding: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Manage Loans
            </Typography>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, mt: 4 }}>
           
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                slots={{
                  toolbar: GridToolbar,
                }}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </div>
          </Paper>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              "& .MuiDialog-paper": {
                minWidth: "200px",
                maxWidth: "70%",
                width: "30%",
              },
            }}
          >
            <DialogTitle>Edit Loan Status</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mb: 2,mt:2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="In Default">In Default</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleSaveClick(loanId, status)}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </motion.div>
    </Box>
  );
};

export default LoansPage;
