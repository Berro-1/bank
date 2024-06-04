import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const TransactionsDialog = ({ open, handleClose, transactions, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 5,
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <DialogTitle sx={{ bgcolor: "#1976d2", color: "#fff" }}>
        Transactions
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : transactions.length ? (
          <List>
            {transactions.map((transaction) => (
              <React.Fragment key={transaction._id}>
                <ListItem alignItems="flex-start">
                  <Avatar sx={{ bgcolor: "#1976d2", marginRight: 2 }}>
                    <AccountBalanceIcon />
                  </Avatar>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                          className="flex align-middle justify-start"
                        >
                          ${transaction.amount} -{" "}
                          <Typography
                            variant=""
                            color="text.secondary"
                            sx={{ fontStyle: "italic", marginLeft: "5px" }}
                          >
                            {transaction.type}
                          </Typography>
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <strong>Date:</strong>{" "}
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <strong>From:</strong> {transaction.senderName} (
                          {transaction.senderTransferType})
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <strong>To:</strong>{" "}
                          {transaction.receiverModel === "Loan"
                            ? transaction.type
                            : transaction.receiverName}{" "}
                          ({transaction.receiverTransferType})
                        </Typography>
                        <br />
                        
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="middle" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography>No transactions found for this account.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionsDialog;
