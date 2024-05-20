import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative md:flex bg-gray-800 h-screen">
      {/* Overlay to click out of the menu */}
      {isOpen && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          !isOpen ? "-translate-x-full" : ""
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 h-full`}
      >
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        <ul className="text-center mx-3">
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 hover:text-custom-purple"
            >
              <HomeOutlinedIcon className="text-lg" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block py-2 hover:text-custom-purple"
            >
              <FontAwesomeIcon icon={faUser} className="text-lg" /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/transactions"
              className="block py-2 hover:text-custom-purple"
            >
              <ReceiptLongOutlinedIcon className="text-lg" /> Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/admin/loans"
              className="block py-2 hover:text-custom-purple"
            >
              <AttachMoneyOutlinedIcon className="text-lg" /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/admin/investments"
              className="block py-2 hover:text-custom-purple"
            >
              <CategoryOutlinedIcon className="text-lg" /> Investments
            </Link>
          </li>
          <li>
            <Link
              to="/admin/credit-cards"
              className="block py-2 hover:text-custom-purple border-b-0.5 pb-10"
            >
              <FontAwesomeIcon icon={faCreditCard} className="text-lg" /> Credit
              Cards
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block py-2 hover:text-custom-purple pt-6"
            >
              <ExitToAppOutlinedIcon className="text-lg" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Burger Icon */}
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

export default AdminSidebar;
