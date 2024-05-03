import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
        setIsOpen(false); // Close menu if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Dependency array includes isOpen to re-run effect when it changes

  return (
    <nav className="bg-green-800 px-14 py-3 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="logo bg-removed.png"
            alt="Investmint Logo"
            className="h-12 w-auto object-cover"
          />
          <span className="text-white text-2xl font-bold leading-none">
            Investmint
          </span>
        </div>
        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-green-500 p-2"
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
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {/* Slide-out menu for small screens */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-64 bg-green-900 bg-opacity-95 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out  flex flex-col items-center justify-start w-64 md:hidden py-7`}
        >
          <Link
            to="/"
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out  border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/test"
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out  border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Test
          </Link>
          <Link
            to="/login"
            className="text-white text-lg mb-3 hover:text-green-300 hover:border-green-300 transition duration-300 ease-in-out border-b-2"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </div>
        {/* Normal display of links for large screens */}
        <div className="hidden md:flex gap-6 ml-auto">
          <Link
            to="/"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            to="/test"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4"
          >
            Test
          </Link>
          <Link
            to="/login"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
