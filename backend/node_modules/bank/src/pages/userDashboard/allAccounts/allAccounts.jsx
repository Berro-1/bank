import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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


  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-grow p-10">
      <Typography variant="h4" component="h1" gutterBottom className="font-bold pt-10">
          Accounts
        </Typography>
        <div className="flex justify-center">
        
        {loading ? (
        <CircularProgress color="primary" />
      ) : (
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
                    image={accountTypeToImage[account.type] || 'default_image_path'} // Use a default image path if type is not found
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
                )}

        </div>
      </div>
    </div>
  );
}
