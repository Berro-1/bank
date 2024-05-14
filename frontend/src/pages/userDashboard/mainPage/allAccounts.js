import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../components/layout/hero/Sidebar";
import "./allAccounts.css";

export default function AllAccounts() {
  const accounts = [
    { id: 1, title: "Checking Account", description: "You have $30,581", image: "./checking.webp" },
    { id: 2, title: "Savings Account", description: "You have $45,000", image: "./savings.webp" },
    { id: 3, title: "CreditCard Account", description: "You have $2,500", image: "./creditcards.webp" },
    { id: 4, title: "Loan Account", description: "You still owe $2,249", image: "./loans.webp" },

  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {accounts.map((account) => (
              <Card key={account.id} className="fadeIn" style={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={account.image}
                    alt={account.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className="text-center font-extrabold">
                      {account.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="text-center">
                      {account.description}
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
