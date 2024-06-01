import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import "./allAccounts.css";
import { getAllAccounts } from "../../../store/accounts/accountsActions";
import { getAllLoans } from "../../../store/Loans/loansActions";

const typeToImage = {
  Auto: "./loans.webp",
  Mortgage: "./loans.webp",
  Education: "./loans.webp",
  Personal: "./loans.webp",
  Savings: "./savings.webp",
};

export default function AllAccounts() {
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  const { loading: loadingAccounts, accounts } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );
  const { loading: loadingLoans, loans } = useSelector(
    (state) => state.loans || { loans: [], loading: false }
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getAllAccounts(userId)).then(() => {
        console.log("Accounts fetched:", accounts);
      });
      dispatch(getAllLoans(userId)).then(() => {
        console.log("Loans fetched:", loans);
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Accounts state updated:", accounts);
  }, [accounts]);

  useEffect(() => {
    console.log("Loans state updated:", loans);
  }, [loans]);

  const activeLoans = loans.filter((loan) => loan.status === "Active");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow py-8 px-6">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="font-bold pt-6"
        >
          Accounts and Active Loans
        </Typography>
        <div className="flex justify-center">
          {loadingAccounts || loadingLoans ? (
            <CircularProgress color="primary" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {accounts.length === 0 && activeLoans.length === 0 ? (
                <Typography variant="h6" component="div" className="text-center">
                  No accounts or active loans available.
                </Typography>
              ) : (
                <>
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
                          image={typeToImage[account.type] || "default_image_path"}
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
                  {activeLoans.map((loan) => (
                    <Card
                      key={loan._id}
                      className="fadeIn"
                      style={{ maxWidth: 345 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={typeToImage[loan.type] || "default_image_path"}
                          alt={loan.status}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="text-center font-extrabold"
                          >
                            {loan.type}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="text-center"
                          >
                            Amount: ${loan.amount} - Status: {loan.status}
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
