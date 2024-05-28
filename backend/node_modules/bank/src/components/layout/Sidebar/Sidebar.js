import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; // added to maintain consistency

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:flex bg-gray-800 h-screen">
      {isOpen && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          !isOpen ? "-translate-x-full" : ""
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 h-full`}
      >
        <h1 className="text-2xl font-bold text-center mb-10">SafeStream</h1>
        <ul className="text-center mx-3 space-y-6">
          <li>
            <Link
              to="/mainPage"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeOutlinedIcon className="mr-3" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/allAccounts"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" /> All Accounts
            </Link>
          </li>
          <li>
            <Link
              to="/submissions"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <DescriptionOutlinedIcon className="mr-3" /> Applications
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <ReceiptLongOutlinedIcon className="mr-3" /> Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/transfers"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <SyncAltOutlinedIcon className="mr-3" /> Transfers
            </Link>
          </li>
          <li>
            <Link
              to="/cards"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-3" /> Cards
            </Link>
          </li>
          <li>
            <Link
              to="/loans"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <RequestQuoteOutlinedIcon className="mr-3" /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <LogoutOutlinedIcon className="mr-3" /> Logout
            </Link>
          </li>
        </ul>
      </div>
      <button
        onClick={toggleSidebar}
        className="text-white md:hidden z-40 absolute top-2 left-2 p-3"
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
