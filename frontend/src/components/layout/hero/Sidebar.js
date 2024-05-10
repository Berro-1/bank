// components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="h-full bg-gray-900 text-white z-20 flex flex-col items-center">
      <div className="px-2 pt-3 text-center text-2xl font-bold pb-16">
        <h1>Ajinkya</h1>
      </div>
      <ul className="w-full">
        {[
          {
            icon: <FontAwesomeIcon icon={faUser} className="text-lg" />,
            label: "All Accounts",
            to: "/",
          },
          {
            icon: <ReceiptLongOutlinedIcon className="text-lg" />,
            label: "Transactions",
            to: "/content",
          },
          {
            icon: <FontAwesomeIcon icon={faCreditCard} className="text-lg" />,
            label: "Cards",
            to: "/analytics",
          },
          {
            icon: <RequestQuoteOutlinedIcon className="text-lg" />,
            label: "Loans",
            to: "/likes",
          },
          {
            icon: <LogoutOutlinedIcon className="text-lg" />,
            label: "Logout",
            to: "/logout",
          },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className="flex justify-center py-2 hover:text-custom-purple text-white"
          >
            <div className="flex items-center space-x-2 justify-start max-w-max mx-auto">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
