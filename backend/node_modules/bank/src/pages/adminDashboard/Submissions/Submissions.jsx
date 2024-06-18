import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { getAllSubmissions, updateSubmissionStatus } from "../../../store/submissions/submissionsActions";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";
import UpdateStatusDialog from "./dialogs/updateDialog"; // Import the new component
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

const SubmissionsPage = () => {
  const dispatch = useDispatch();
  const { submissions, loading, error } = useSelector(
    (state) => state.submissions || { submissions: [] }
  );
  const [tabValue, setTabValue] = useState("credit-card");
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    dispatch(getAllSubmissions(tabValue));
  }, [dispatch, tabValue]);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (details) => {
    setSelectedDetails(details);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDetails(null);
  };

  const handleOpenUpdateDialog = (submission) => {
    setSelectedSubmission(submission);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedSubmission(null);
  };

  const handleUpdateStatus = (newStatus) => {
    if (selectedSubmission) {
      dispatch(updateSubmissionStatus(selectedSubmission.id, newStatus));
    }
  };

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => params.row.user.name || "No name provided",
    },
    {
      field: "requestType",
      headerName: "Request Type",
      width: 150,
      renderCell: (params) => {
        if (params.row.requestType === "credit-card") {
          return params.row.details.cardName;
        } else if (params.row.requestType === "new-account")
          return params.row.details.accountType;
      },
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
    {
      field: "details",
      headerName: "Details",
      width: 180,
      renderCell: (params) => {
        if (
          (params.row.requestType === "new-account" &&
            params.row.details.accountType === "Loan") ||
          params.row.requestType === "credit-card"
        ) {
          return (
            <Button onClick={() => handleOpenDialog(params.row.details)}>
              View Details
            </Button>
          );
        }
        return "N/A";
      },
    },
    {
      field: "createdAt",
      headerName: "Submitted On",
      width: 180,
      renderCell: ({ value }) =>
        new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      field: "update",
      headerName: "Update",
      width: 180,
      renderCell: (params) => (
        <Button onClick={() => handleOpenUpdateDialog(params.row)}>
          update status
        </Button>
      ),
    },
  ];

  const rows = submissions.map((sub) => ({
    ...sub,
    id: sub._id, // Ensure each row has a unique ID
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Submissions
        </Typography>
        <Paper
          sx={{
            p: 2,
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="Submission types"
          >
            <Tab
              icon={<CreditCardIcon />}
              label="Credit Cards"
              value="credit-card"
            />
            <Tab
              icon={<AccountBalanceIcon />}
              label="New Accounts"
              value="new-account"
            />
          </Tabs>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">
              {error.message || "An unexpected error occurred"}
            </Typography>
          ) : submissions.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
              slots={{ toolbar: GridToolbar }}
              autoHeight
            />
          ) : (
            <Typography sx={{ mt: 2 }}>No submissions found.</Typography>
          )}
        </Paper>
        {selectedDetails && (
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="sm"
            sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#f3f4f6",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Submission Details
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: "#fafafa" }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CreditCardIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={selectedDetails.cardName}
                    secondary="Card Name"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountBalanceIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`$${selectedDetails.creditLimit}`}
                    secondary="Credit Limit"
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions
              sx={{ padding: "8px 24px", backgroundColor: "#f3f4f6" }}
            >
              <Button
                onClick={handleCloseDialog}
                color="primary"
                variant="contained"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {selectedSubmission && (
          <UpdateStatusDialog
            open={openUpdateDialog}
            handleClose={handleCloseUpdateDialog}
            handleUpdate={handleUpdateStatus}
            currentStatus={selectedSubmission.status}
          />
        )}
      </Container>
    </Box>
  );
};

export default SubmissionsPage;
