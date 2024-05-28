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
  const initialFormState = {
    requestType: '',
  };

const initialCreditCardState = () => {
  const currentDate = new Date();
  const fiveYearsLater = new Date(currentDate.setFullYear(currentDate.getFullYear() + 5));

  return {
    cardName: '',
    expiryDate: fiveYearsLater.toISOString().slice(0, 10), // Formats the date as YYYY-MM-DD
    creditLimit: '',
  };
};
  const initialAccountState = {
    accountType: '',
    loanType: '',
    amount: '',
    loanTerm: '',
  };

  const [formDetails, setFormDetails] = useState(initialFormState);
  const [creditCardDetails, setCreditName] = useState(initialCreditCardState);
  const [accountDetails, setAccountDetails] = useState(initialAccountState);

  const resetForm = () => {
    setFormDetails(initialFormState);
    setCreditName(initialCreditCardState);
    setAccountDetails(initialAccountState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    let creditLimit = '';
  
    switch (value) {
      case 'Silver Card':
        creditLimit = 5000;
        break;
      case 'Gold Card':
        creditLimit = 10000;
        break;
      case 'Platinum Card':
        creditLimit = 20000;
        break;
      default:
        break;
    }
  
    setCreditName({ ...creditCardDetails, [name]: value, creditLimit });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formDetails.requestType === 'Credit Card') {
      onSubmit({ ...creditCardDetails, requestType: 'Credit Card' });
    } else if (formDetails.requestType === 'New Account') {
      onSubmit({ ...accountDetails, requestType: 'New Account' });
    }
    toggle();
    resetForm(); // Reset form after submission
  };

  const handleCancel = () => {
    toggle();
    resetForm(); // Reset form after canceling
  };

  const renderLoanOptions = () => {
    let options = [];
    for (let i = 6; i <= 36; i += 6) {
      options.push(<MenuItem key={i} value={i}>{`${i} months`}</MenuItem>);
    }
    return options;
  };
  
  const renderConditionalInputs = () => {
    switch (formDetails.requestType) {
      case 'Credit Card':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Card Name"
              name="cardName"
              value={creditCardDetails.cardName}
              onChange={handleCreditCardChange}
              margin="normal"
              required
            >
              <MenuItem value="Silver Card">Silver Card</MenuItem>
              <MenuItem value="Gold Card">Gold Card</MenuItem>
              <MenuItem value="Platinum Card">Platinum Card</MenuItem>
            </TextField>
            {creditCardDetails.cardName && (
              <TextField
                fullWidth
                label="Credit Limit"
                name="creditLimit"
                value={creditCardDetails.creditLimit}
                onChange={handleCreditCardChange}
                margin="normal"
                required
                disabled
              />
            )}
          </>
        );
      case 'New Account':
        return (
          <>
            <TextField
              select
              fullWidth
              label="Account Type"
              name="accountType"
              value={accountDetails.accountType}
              onChange={handleAccountChange}
              margin="plain"
              required
            >
              <MenuItem value="Checking">Checking</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Loan">Loan</MenuItem>
            </TextField>
            {accountDetails.accountType === 'Loan' && (
              <>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  name="amount"
                  value={accountDetails.amount}
                  onChange={handleAccountChange}
                  margin="normal"
                  required
                />
                <TextField
                  select
                  fullWidth
                  label="Loan Type"
                  name="loanType"
                  value={accountDetails.loanType}
                  onChange={handleAccountChange}
                  margin="tall"
                  required
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Mortgage">Mortgage</MenuItem>
                  <MenuItem value="Auto">Auto</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Loan Term"
                  name="loanTerm"
                  value={accountDetails.loanTerm}
                  onChange={handleAccountChange}
                  margin="normal"
                  required
                >
                  {renderLoanOptions()}
                </TextField>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };
  

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
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
            <MenuItem value="New Account">New Account</MenuItem>
          </TextField>
          {renderConditionalInputs()}
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
              onClick={handleCancel}
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
