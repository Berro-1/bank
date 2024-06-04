import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import "./Navbar.css"; // Ensure the CSS file is correctly referenced

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center px-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="SafeStream Logo" className="logo" />
          <span className="brand">SafeStream</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-toggle text-white focus:outline-none focus:ring-2 p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-16 6h16"
            />
          </svg>
        </button>
        <div
          ref={menuRef}
          className={`nav-menu fixed top-0 right-0 h-full w-64 bg-gray-800 bg-opacity-95 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out flex flex-col items-center justify-start py-7 lg:hidden`}
          style={{ zIndex: isOpen ? 2000 : 1 }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <NavLink
            to="/"
            exact
            className="nav-link"
            activeClassName="active"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/AboutUs"
            className="nav-link"
            activeClassName="active"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/Services"
            className="nav-link"
            activeClassName="active"
            onClick={() => setIsOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/Contact"
            className="nav-link"
            activeClassName="active"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#64CCC5",
              color: "white",
              marginTop: "10px",
              "&:hover": {
                borderColor: "#52A9A5",
                color: "#52A9A5",
              },
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "50px",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </Button>
        </div>
        <div className="hidden lg:flex gap-6">
          <NavLink to="/" exact className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/AboutUs" className="nav-link" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/Services" className="nav-link" activeClassName="active">
            Services
          </NavLink>
          <NavLink to="/Contact" className="nav-link" activeClassName="active">
            Contact
          </NavLink>
        </div>
        <div className="hidden lg:flex items-center">
          <Button
            to="/Login"
            component={NavLink}
            variant="outlined"
            sx={{
              borderColor: "#64CCC5",
              color: "white",
              "&:hover": {
                borderColor: "#52A9A5",
                color: "#52A9A5",
              },
              padding: "10px 30px",
              borderRadius: "50px",
              transition: "all 0.3s ease",
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
