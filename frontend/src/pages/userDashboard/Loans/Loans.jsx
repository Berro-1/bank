import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Sidebar from "../../../components/layout/hero/Sidebar";
import { getAllLoans } from "../../../store/Loans/loansActions";

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

const LoansPage = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector(
    (state) => state.loans || { loans: [], loading: false }
  );

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllLoans("6644dcb9c16b269cf9bae998"));
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
        <div className="flex items-center justify-between">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="font-bold"
          >
            Loans
          </Typography>
          {/* <Button
            sx={{
              backgroundColor: '#111827',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333A45',
              },
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
            }}
            // onClick={handleModalOpen} // Open the modal when this button is clicked
          >
            Apply For Loan
          </Button> */}
        </div>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan) => (
                  <StyledTableRow key={loan._id}>
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>{`$${loan.amount}`}</TableCell>
                    <TableCell>{`${loan.interest_rate}%`}</TableCell>
                    <TableCell>{loan.loan_term}</TableCell>
                    <TableCell>{loan.status}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>

      {/* <ApplyLoanModal isOpen={modalOpen} onClose={handleModalClose} /> */}
    </div>
  );
};

export default LoansPage;
