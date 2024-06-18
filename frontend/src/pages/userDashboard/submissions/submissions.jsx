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
import {
  CheckCircleOutline,
  HourglassEmpty,
  ErrorOutline,
} from "@mui/icons-material";

const StatusIndicator = styled("div")(({ status, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  color:
    status === "Pending"
      ? theme.palette.warning.main
      : status === "Approved"
      ? theme.palette.success.main
      : theme.palette.error.main,
}));

const StatusIcon = ({ status }) => {
  switch (status) {
    case "Pending":
      return (
        <HourglassEmpty style={{ fontSize: "1rem", marginRight: "5px" }} />
      );
    case "Approved":
      return (
        <CheckCircleOutline style={{ fontSize: "1rem", marginRight: "5px" }} />
      );
    default:
      return <ErrorOutline style={{ fontSize: "1rem", marginRight: "5px" }} />;
  }
};

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
      renderCell: (params) =>
        new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "requestType",
      headerName: "Request Type",
      flex: 1,
      renderCell: (params) =>
        getRequestTypeLabel(params.row.details.requestType, params.row.details),
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
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <StatusIcon status={params.value} />
          <StatusIndicator status={params.value}>
            {params.value}
          </StatusIndicator>
        </div>
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
