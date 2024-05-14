import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Sidebar from "../../../components/layout/hero/Sidebar";
import "./allAccounts.css";

export default function AllAccounts() {
  const [expanded, setExpanded] = useState(null);

  const accounts = [
    { id: 1, title: "Checking account", description: "You have $30,581" },
    { id: 2, title: "Savings account", description: "You have $30,581" },
    {
      id: 3,
      title: "Loan account",
      description: "You still have $2,249 of the loan",
    },
  ];

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {accounts.map((account) => (
              <Card
                key={account.id}
                className={`fadeIn card ${
                  expanded === account.id ? "expanded" : ""
                }`}
                style={{ maxWidth: 345 }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="text-center font-extrabold"
                  >
                    {account.title}
                  </Typography>
                  <Typography variant="body2" className="text-center font-bold">
                    {account.description}
                  </Typography>
                </CardContent>
                <CardActions className="cardActions flex justify-center items-center">
                  {expanded === account.id ? (
                    <ArrowDropUpIcon
                      style={{ fontSize: 40, cursor: "pointer" }}
                      onClick={() => handleExpandClick(account.id)}
                    />
                  ) : (
                    <ArrowDropDownCircleIcon
                      style={{ fontSize: 40, cursor: "pointer" }}
                      onClick={() => handleExpandClick(account.id)}
                    />
                  )}
                </CardActions>
                <div
                  className={`expandableContent ${
                    expanded === account.id ? "expandOpen" : "expandClose"
                  }`}
                >
                  <Button size="small" className="scale mt-2 centered-button">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
