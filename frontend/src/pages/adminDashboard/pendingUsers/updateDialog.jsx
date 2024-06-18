// UpdateStatusDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const UpdateStatusDialog = ({
  open,
  handleClose,
  handleUpdate,
  currentStatus,
  userId,
}) => {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    handleUpdate(status);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Pending Users Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleChange}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateStatusDialog;
