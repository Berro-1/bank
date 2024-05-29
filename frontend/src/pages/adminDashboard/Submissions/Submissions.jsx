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
import { getAllSubmissions } from "../../../store/submissions/submissionsActions";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";

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

const SubmissionsPage = () => {
  const dispatch = useDispatch();
  const { submissions, loading, error } = useSelector(
    (state) => state.submissions || { submissions: [] }
  );
  const [tabValue, setTabValue] = useState("credit-card");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

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
      headerContactBlog: "Status",
      width: 180,
      renderCell: (params) => (
        <>
          <StatusIndicator status={params.value} /> {params.value}
        </>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 300,
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
  ];

  const rows = submissions.map((sub) => ({
    ...sub,
    id: sub._id, // Ensure each row has a unique ID
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
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
              components={{ Toolbar: GridToolbar }}
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
      </Container>
    </Box>
  );
};

export default SubmissionsPage;
