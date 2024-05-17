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
import "./cards.css"; // Make sure to have appropriate CSS styles
import { getcards } from "../../../store/cards/cardsActions";

export default function CreditCards() {
  const userId = "6644dcb9c16b269cf9bae998";

  const dispatch = useDispatch();
  const { loading, cards } = useSelector(
    (state) => state.cards || { cards: [], loading: false }
  );

  useEffect(() => {
    dispatch(getcards(userId)).then(() => {
      console.log("Credit cards fetched:", cards);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Credit cards state updated:", cards); // This logs the credit cards when they change.
  }, [cards]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {cards.map((card) => (
              <Card key={card._id} className="fadeIn" style={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="./creditcard_image.jpg" // Adjust this image path as needed
                    alt="Credit Card"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="text-center font-extrabold"
                    >
                      {card.card_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-center"
                    >
                      Limit: ${card.credit_limit} - Available: $
                      {card.available_credit}
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
