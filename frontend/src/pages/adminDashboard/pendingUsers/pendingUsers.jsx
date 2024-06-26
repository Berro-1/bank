import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { getPendingUsers } from "../../../store/users/userActions";
import AdminSidebar from "../../../components/layout/adminSidebar/adminSidebar";
import {
  CheckCircleOutline,
  HourglassEmpty,
  ErrorOutline,
} from "@mui/icons-material";
import { updatePendingUsers } from "../../../store/users/userActions";
import UpdateStatusDialog from "./updateDialog";

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

export default function PendingUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state) => state.users || { users: [] }
  );
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [selectedUser, setSelectedUser] = useState({ status: "", id: "" });

  useEffect(() => {
    dispatch(getPendingUsers());
  }, [dispatch]);

  const handleOpenImageDialog = (imageUrls) => {
    const fullImageUrls = imageUrls.map((imageUrl) =>
      imageUrl
        ? `http://localhost:4000/uploads/${imageUrl.split("\\").pop()}`
        : "Image not found"
    );
    setCurrentImage(fullImageUrls);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleUpdateDialogOpen = (user) => {
    setSelectedUser({ status: user.status, id: user._id });
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  function formatDate(dateString) {
    if (!dateString) return "No date provided";
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return "Invalid Date";
    }
  }

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone_number", headerName: "Phone Number", width: 130 },
    {
      field: "DOB",
      headerName: "Date of Birth",
      width: 130,
      renderCell: (params) => formatDate(params.row?.DOB),
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
      field: "images",
      headerName: "Image",
      width: 160,
      renderCell: (params) => (
        <Button
          onClick={() =>
            handleOpenImageDialog(params.row.images || ["Image not found"])
          }
        >
          Show Images
        </Button>
      ),
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
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleUpdateDialogOpen(params.row)}>
          Update
        </Button>
      ),
    },
  ];

  const rows =
    users.length > 0
      ? users.map((user) => ({
          ...user,
          id: user._id,
        }))
      : [];

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Pending Users
        </Typography>
        <Paper
          sx={{
            p: 2,
            minHeight: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">
              {error.message || "An unexpected error occurred"}
            </Typography>
          ) : users && users.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={false}
              autoHeight
              slots={{ toolbar: GridToolbar }}
            />
          ) : (
            <Typography>No users found.</Typography>
          )}
          <UpdateStatusDialog
            open={openUpdateDialog}
            handleClose={handleCloseUpdateDialog}
            handleUpdate={(newStatus) => {
              dispatch(updatePendingUsers(selectedUser.id, newStatus));
              console.log("user id:", selectedUser.id, "to status:", newStatus);
              setOpenUpdateDialog(false);
            }}
            currentStatus={selectedUser.status}
            userId={selectedUser.id}
          />
          <Dialog
            open={openImageDialog}
            onClose={handleCloseImageDialog}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>User Images</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {currentImage.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Selfie
                    </Typography>
                    <img
                      src={currentImage[0]}
                      alt="Selfie"
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                    />
                  </Grid>
                )}
                {currentImage.length > 1 && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        ID Photos
                      </Typography>
                    </Grid>
                    {currentImage.slice(1).map((img, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <img
                          src={img}
                          alt={`ID Photo ${index + 1}`}
                          style={{
                            width: "100%",
                            maxHeight: "300px",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImageDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  );
}
