import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import { getAllAccounts } from "../../../../store/allAccounts/allAccountsActions";

const DarkListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: "#4727eb",
  borderRadius: "20px", // Rounded corners
  transition: "background-color 0.3s", // Smooth transition for background color
  "&:hover": {
    backgroundColor: "#6144ee", // Lighter shade on hover
  },
}));

const DarkMenuItem = styled(MenuItem)(({ theme }) => ({
  color: "#ffffff",
  backgroundColor: "#4727eb",
  borderRadius: "10px", // Slightly rounded for menu items
  transition: "background-color 0.2s", // Smooth transition for background color
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
    borderRadius: "15px", // Rounded corners for the menu dropdown
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", // Subtle shadow for pop effect
  },
}));

export default function SimpleListMenu({ onAccountSelect }) {
  const userId = "6644dcb9c16b269cf9bae998";
  const dispatch = useDispatch();
  const { accounts, loading } = useSelector(
    (state) => state.accounts || { accounts: [], loading: false }
  );

  React.useEffect(() => {
    dispatch(getAllAccounts(userId));
  }, [dispatch, userId]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedAccount, setSelectedAccount] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, account) => {
    setSelectedAccount(account);
    setAnchorEl(null);
    onAccountSelect(account._id);
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
          aria-label="Account:"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Account:"
            secondary={
              selectedAccount
                ? `${selectedAccount.type} - ${selectedAccount._id}`
                : "Select an account"
            }
            sx={{
              color: "white",
              "& .MuiListItemText-secondary": { color: "white" },
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
        {accounts.map((account) => (
          <DarkMenuItem
            key={account._id}
            selected={selectedAccount && account._id === selectedAccount._id}
            onClick={(event) => handleMenuItemClick(event, account)}
          >
            {account.type
              ? `${account.type} - ${account._id}`
              : `ID: ${account._id}`}
          </DarkMenuItem>
        ))}
      </DarkMenu>
    </div>
  );
}
