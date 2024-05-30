import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/auth/authActions"; // Adjust the path as necessary

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to the login page after logging out
  };

  return (
    <div className="relative md:flex bg-gray-800 h-100">
      {/* Overlay to click out of the menu */}
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
        <h1 className="text-2xl font-bold text-center mb-10">Admin Panel</h1>
        <ul className="text-center mx-3 space-y-6">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeOutlinedIcon className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUser} className="mr-3" /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/loans"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <AttachMoneyOutlinedIcon className="mr-3" /> Loans
            </Link>
          </li>
          <li>
            <Link
              to="/admin/credit-cards"
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faCreditCard} className="mr-3" /> Submissions
            </Link>
          </li>
         
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200 w-full text-left"
            >
              <ExitToAppOutlinedIcon className="mr-3" /> Logout
            </button>
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

export default AdminSidebar;
