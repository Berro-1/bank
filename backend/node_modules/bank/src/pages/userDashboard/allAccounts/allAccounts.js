import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Typography,
} from "@mui/material";
import Sidebar from "../../../components/layout/hero/Sidebar";
import "./allAccounts.css";
import { getAllAccounts } from "../../../store/allAccounts/allAccountsActions";

// Mapping of account types to image paths
const accountTypeToImage = {
  "Credit Card": "./creditcards.webp",
  Loan: "./loans.webp",
  Savings: "./savings.webp",
  Checking: "./checking.webp",
};

export default function AllAccounts() {
  const userId = "6644dcb9c16b269cf9bae998";

  const dispatch = useDispatch();
  const { loading, accounts } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );

  useEffect(() => {
    dispatch(getAllAccounts(userId)).then(() => {
      console.log("Accounts fetched:", accounts);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Accounts state updated:", accounts); // This logs the accounts when they change.
  }, [accounts]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {accounts.map((account) => (
              <Card
                key={account._id}
                className="fadeIn"
                style={{ maxWidth: 345 }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={accountTypeToImage[account.type]} // Dynamically set image based on account type
                    alt={account.type}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="text-center font-extrabold"
                    >
                      {account.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-center"
                    >
                      Balance: ${account.balance} - Status: {account.status}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className="justify-center">
                  <Button size="small" color="primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
