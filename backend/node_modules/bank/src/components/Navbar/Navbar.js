import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Button from "react-bootstrap/Button";
import "react-bootstrap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-gray-900 py-3 shadow-lg relative">
      <div className="container flex justify-between items-center pl-10 pr-20">
        <div className="flex items-center gap-3">
          <img
            src="logo_investmint-removebg.png"
            alt="Investmint Logo"
            className="h-12 w-auto object-cover"
          />
          <span className="text-white text-2xl font-bold leading-none">
            Investmint
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-green-500 p-2"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 bg-opacity-95 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out flex flex-col items-center justify-start py-7 lg:hidden`}
          style={{ zIndex: isOpen ? 2000 : 1 }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-white hover:text-green-300 focus:outline-none"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link
            to="/"
            className="text-green-400 text-lg mb-3 hover:text-white border-green-400 hover:border-white transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/test"
            className="text-white text-lg mb-3 hover:text-green-400 hover:border-green-400 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to=""
            className="text-white text-lg mb-3 hover:text-green-400 hover:border-green-400 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to=""
            className="text-white text-lg mb-3 hover:text-green-400 hover:border-green-400 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded">
            Login
          </button>
        </div>

        <div className="hidden lg:flex gap-6 ml-[-5rem]">
          <Link
            to="/"
            className="text-green-400 text-lg hover:text-white transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
          >
            Home
          </Link>
          <Link
            to="/test"
            className="text-white text-lg hover:text-green-400 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
          >
            About
          </Link>
          <Link
            to=""
            className="text-white text-lg hover:text-green-400 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
          >
            Services
          </Link>
          <Link
            to=""
            className="text-white text-lg hover:text-green-400 transition duration-300 ease-in-out py-2 hover:underline underline-offset-8"
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center">
          <a href="/Login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-700 rounded">
              Login
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
