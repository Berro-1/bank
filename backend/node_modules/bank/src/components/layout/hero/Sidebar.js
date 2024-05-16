import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:flex bg-gray-800">
      {/* Overlay to click out of the menu */}
      {isOpen && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white  w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          !isOpen ? "-translate-x-full" : ""
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 h-full`}
      >
        <h1 className="text-2xl font-bold text-center">Investmint</h1>
        <ul className="text-center mx-3">
          <li>
            <Link
              to="/allAccounts"
              className="block py-2 hover:text-custom-purple"
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" /> All Accounts
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="block py-2 hover:text-custom-purple">
              <ReceiptLongOutlinedIcon className="text-lg" /> Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="block py-2 hover:text-custom-purple"
            >
              <FontAwesomeIcon icon={faCreditCard} className="text-lg" /> Cards
            </Link>
          </li>
          <li>
            <Link
              to="/loans"
              className="block py-2 hover:text-custom-purple border-b-0.5 pb-10 "
            >
              <RequestQuoteOutlinedIcon className="text-lg" /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block py-2 hover:text-custom-purple pt-6"
            >
              <LogoutOutlinedIcon className="text-lg" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Burger Icon */}
      <button
        onClick={toggleSidebar}
        className="text-white md:hidden z-40 absolute top-30 p-3"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
