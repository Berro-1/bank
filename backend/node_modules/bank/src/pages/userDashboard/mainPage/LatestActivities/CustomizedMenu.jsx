import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import { getAllAccounts } from "../../../../store/accounts/accountsActions";
import { getCards } from "../../../../store/cards/cardsActions";

const DarkListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: "#4727eb",
  borderRadius: "20px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#6144ee",
  },
}));

const DarkMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "#4727eb",
  borderRadius: "10px",
  transition: "background-color 0.2s",
  "&.Mui-selected": {
    backgroundColor: "#4727eb",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#6144ee",
  },
}));

const DarkMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#4727eb",
    color: theme.palette.common.white,
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

export default function SimpleListMenu({ onAccountSelect }) {
  const userId = "6644dcb9c16b269cf9bae998";
  const dispatch = useDispatch();
  const { accounts, loading: accountsLoading } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );
  const { cards, loading: cardsLoading } = useSelector(
    (state) => state.cards || { cards: [], loading: false }
  );

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
        <DarkListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Account or Card:"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Account or Card:"
            secondary={
              selectedItem
                ? `${
                    selectedItem.itemType === "Account"
                      ? selectedItem.type
                      : selectedItem.card_name
                  }`
                : "Select an account or card"
            }
            sx={{
              color: "white",
              "& .MuiListItemText-secondary": { color: "white" },
              display: "flex", // Enable flexbox
              flexDirection: "column", // Stack children vertically
              alignItems: "center", // Center horizontally
              justifyContent: "center", // Center vertically
            }}
          />
        </DarkListItemButton>
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
            {item.itemType === "Account"
              ? `${item.type} - ${item._id}`
              : `${item.card_name} - ${item.card_number}`}
          </DarkMenuItem>
        ))}
      </DarkMenu>
    </div>
  );
}
