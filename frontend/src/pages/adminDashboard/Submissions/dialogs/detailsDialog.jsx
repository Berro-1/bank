import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/Creditcard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SubmissionDetailsDialog = ({ open, handleClose, details }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}
    >
      <DialogTitle sx={{ backgroundColor: '#f3f4f6', color: '#333', fontWeight: 'bold' }}>
        Submission Details
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#fafafa' }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CreditCardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={details.cardName} secondary="Card Name" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={`$${details.creditLimit}`} secondary="Credit Limit" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions sx={{ padding: '8px 24px', backgroundColor: '#f3f4f6' }}>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionDetailsDialog;
