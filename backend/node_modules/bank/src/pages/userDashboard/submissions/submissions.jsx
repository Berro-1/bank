import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Paper,
  Typography,
  CircularProgress,
  Button,
  Container,
  Box,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import {
  getSubmissions,
  submitNewAccountDetails,
  submitCreditCardDetails,
} from "../../../store/submissions/submissionsActions";
import ApplySubmissionModal from "./popupModal";

const StatusIndicator = styled("span")(({ status }) => ({
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
      : "#F6B000", // Default color (yellow)
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
  const dispatch = useDispatch();
  const { loading, submissions, error } = useSelector(
    (state) => state.submissions || { submissions: [], loading: false }
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      const userId = user.id;
      dispatch(getSubmissions(userId));
    }
  }, [dispatch]);

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleFormSubmit = (formDetails) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      const userId = user.id;
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
    }
    toggleModal();
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "requestType",
      headerName: "Request Type",
      flex: 1,
      renderCell: (params) => getRequestTypeLabel(params.row.details.requestType, params.row.details),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) =>
        params.row.details.creditLimit || params.row.details.amount || "0",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          <StatusIndicator status={params.row.status} />
          {' '}
          {params.row.status}
        </>
      ),
    },
  ];

  const rows = submissions && submissions.map((submission) => ({
    id: submission._id,
    createdAt: submission.createdAt,
    details: submission.details,
    status: submission.status,
  }));

  return (
    <div className="flex w-full">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ padding: 20, flexGrow: 1 }}
      >
        <Container maxWidth="lg">
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress color="primary" />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginTop: 3 }}>
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
        </Container>
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
