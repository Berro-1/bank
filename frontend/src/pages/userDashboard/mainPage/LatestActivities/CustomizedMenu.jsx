import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { motion } from "framer-motion";
import { getAllAccounts } from "../../../../store/accounts/accountsActions";
import { getCards } from "../../../../store/cards/cardsActions";

const DarkListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: "#4727eb",
  borderRadius: "20px",
  transition: "transform 0.2s, box-shadow 0.2s, background-color 0.3s",
  "&:hover": {
    backgroundColor: "#6144ee",
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  },
}));

const DarkMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "#4727eb",
  borderRadius: "10px",
  transition: "background-color 0.2s, transform 0.1s",
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: "#6144ee",
    transform: "scale(1.03)",
  },
  "&:hover": {
    backgroundColor: "#6144ee",
    transform: "scale(1.02)",
  },
}));

const DarkMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#4727eb",
    color: theme.palette.common.white,
    borderRadius: "15px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    minWidth: "240px",
    padding: "4px 0",
  },
}));
export default function SimpleListMenu({ onAccountSelect }) {
  const dispatch = useDispatch();
  const { accounts, loading: accountsLoading } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );
  const { cards, loading: cardsDesiring } = useSelector(
    (state) => state.cards || { cards: [], loading: false }
  );
  const userId = "6644dcb9c16b269cf9bae998";

  React.useEffect(() => {
    dispatch(getAllAccounts(userId));
    dispatch(getCards(userId));
  }, [dispatch, userId]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const open = Boolean(anchorEl);

  const items = [
    ...accounts.map((account) => ({ ...account, itemType: "Account" })),
    ...cards.map((card) => ({ ...card, itemType: "Card" })),
  ];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, item) => {
    setSelectedItem(item);
    setAnchorEl(null);
    onAccountSelect(item._id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DarkListItemButton
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Account or Card:"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "white" }}
                >
                  Account or Card:
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  sx={{ color: "white", opacity: 0.7 }}
                >
                  {selectedItem
                    ? `${
                        selectedItem.itemType === "Account"
                          ? selectedItem.type
                          : selectedItem.card_name
                      }`
                    : "Select an account or card"}
                </Typography>
              }
              sx={{ textAlign: "center" }}
            />
          </DarkListItemButton>
        </motion.div>
      </List>
      <DarkMenu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {items.map((item) => (
          <DarkMenuItem
            key={item._id}
            selected={selectedItem && item._id === selectedItem._id}
            onClick={(event) => handleMenuItemClick(event, item)}
          >
            {item.itemType === "Account" ? (
              <AccountCircleIcon sx={{ mr: 1 }} />
            ) : (
              <CreditCardIcon sx={{ mr: 1 }} />
            )}
            {item.itemType === "Account"
              ? `${item.type} - ${item._id}`
              : `${item.card_name} - ${item.card_number}`}
          </DarkMenuItem>
        ))}
      </DarkMenu>
    </div>
  );
}
