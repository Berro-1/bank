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
  getSubmissions,
  submitNewAccountDetails,
  submitCreditCardDetails,
} from "../../../store/submissions/submissionsActions";
import ApplySubmissionModal from "./popupModal";

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
  backgroundColor:
    status === "Approved"
      ? "#4CAF50" // Green
      : status === "Rejected"
      ? "#F44336" // Red
      : "#F6B000",
}));

const getRequestTypeLabel = (requestType, details) => {
  switch (requestType) {
    case "Credit Card":
      return details.cardName || "Credit Card";
    case "New Account":
      return details.accountType || "New Account";
    default:
      return requestType;
  }
};

const Submissions = () => {
  const userId = "6644dcb9c16b269cf9bae998";
  const dispatch = useDispatch();
  const { loading, submissions } = useSelector(
    (state) => state.submissions || { submissions: [], loading: false }
  );

  useEffect(() => {
    dispatch(getSubmissions(userId));
  }, [dispatch, userId]);

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleFormSubmit = (formDetails) => {
    switch (formDetails.requestType) {
      case "Credit Card":
        dispatch(submitCreditCardDetails(formDetails, userId));
        break;
      case "New Account":
        dispatch(submitNewAccountDetails(formDetails, userId));
        break;
      default:
        break;
    }
    toggleModal();
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
        <div className="flex items-center justify-between">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="font-bold"
          >
            Submissions
          </Typography>
          <Button
            sx={{
              backgroundColor: "#111827",
              color: "white",
              "&:hover": {
                backgroundColor: "#333A45",
              },
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
            }}
            onClick={toggleModal}
          >
            Apply
          </Button>
        </div>
        {loading ? (
          <CircularProgress color="primary" />
        ) : (
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Request Type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions &&
                  submissions.map((submission) => (
                    <StyledTableRow key={submission._id}>
                      <TableCell>
                        {new Date(
                          submission.createdAt
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getRequestTypeLabel(
                          submission.details.requestType,
                          submission.details
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.details.creditLimit ||
                          submission.details.amount ||
                          "0"}
                      </TableCell>
                      <TableCell>
                        <StatusIndicator status={submission.status} />
                        {" "}{submission.status}
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </motion.div>
      <ApplySubmissionModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Submissions;
