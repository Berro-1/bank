import React, { useState } from 'react';
import { Box, Modal, Typography, TextField, Button, MenuItem } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ApplySubmissionModal = ({ isOpen, toggle, onSubmit }) => {
  const [formDetails, setFormDetails] = useState({
    requestType: '',
    details: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formDetails);
    toggle();
  };

  return (
    <Modal
      open={isOpen}
      onClose={toggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Submission
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Request Type"
            name="requestType"
            value={formDetails.requestType}
            onChange={handleInputChange}
            margin="normal"
            required
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Loan">Loan</MenuItem>
            <MenuItem value="New Account">New Account</MenuItem>
            <MenuItem value="New Checkbook">New Checkbook</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Details"
            name="details"
            value={formDetails.details}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              sx={{
                backgroundColor: '#111827',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#333A45',
                },
                textTransform: 'none',
                mr: 1,
              }}
            >
              Submit
            </Button>
            <Button
              onClick={toggle}
              sx={{
                backgroundColor: '#6c757d',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#5a6268',
                },
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ApplySubmissionModal;
