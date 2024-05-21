import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import "./cards.css"; // Make sure to have appropriate CSS styles
import { getcards } from "../../../store/cards/cardsActions";

// Function to get image path based on card name
const getImagePath = (cardName) => {
  switch (cardName) {
    case "Silver Card":
      return "card-silver.webp";
    case "Gold Card":
      return "card-gold.webp";
    case "Platinum Card":
      return "card-plat.webp";
    default:
      return "default_card_image.webp"; // Provide a default image path
  }
};

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
          Cards
        </Typography>
        <div className="flex justify-center">
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {cards.map((card) => (
                <Card
                  key={card._id}
                  className="fadeIn"
                  style={{ maxWidth: 345 }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getImagePath(card.card_name)} // Dynamically set image based on card name
                      alt={card.card_name}
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
          )}
        </div>
      </div>
    </div>
  );
}
