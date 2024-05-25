import React, { useState } from 'react';
import { Box, Dialog, Typography, TextField, Button, MenuItem } from '@mui/material';

const style = {
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
    amount: '',
    loanType: '',
    cardName: '',
    expiryDate: '',
    creditLimit: '',
    accountType: '',
    accountNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formDetails);
    clearForm();
    toggle();
  };

  const clearForm = () => {
    setFormDetails({
      requestType: '',
      details: '',
      amount: '',
      loanType: '',
      cardName: '',
      expiryDate: '',
      creditLimit: '',
      accountType: '',
      accountNumber: '',
    });
  };

  const handleClose = () => {
    clearForm();
    toggle();
  };

  const renderConditionalInputs = () => {
    switch (formDetails.requestType) {
      case 'Credit Card':
        return (
          <>
            <TextField
              fullWidth
              label="Card Name"
              name="cardName"
              value={formDetails.cardName}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="date"
              label="Expiry Date"
              name="expiryDate"
              value={formDetails.expiryDate}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Credit Limit"
              name="creditLimit"
              value={formDetails.creditLimit}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </>
        );
      case 'Loan':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Loan Type"
              name="loanType"
              value={formDetails.loanType}
              onChange={handleInputChange}
              margin="normal"
              required
            >
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Mortgage">Mortgage</MenuItem>
              <MenuItem value="Auto">Auto</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="amount"
              value={formDetails.amount}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </>
        );
      case 'New Account':
        return (
          <TextField
            fullWidth
            label="Account Type"
            name="accountType"
            value={formDetails.accountType}
            onChange={handleInputChange}
            margin="normal"
            required
          />
        );
      case 'New Checkbook':
        return (
          <TextField
            fullWidth
            label="Account Number"
            name="accountNumber"
            value={formDetails.accountNumber}
            onChange={handleInputChange}
            margin="normal"
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Box sx={style}>
        <Typography id="dialog-title" variant="h6" component="h2">
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
          {renderConditionalInputs()}
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
              onClick={handleClose}
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
    </Dialog>
  );
};

export default ApplySubmissionModal;
