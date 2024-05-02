import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-800 px-14 py-3 shadow-lg">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex items-center gap-3 mr-auto">
          <img
            src="logo bg-removed.png"
            alt="Investmint Logo"
            className="h-12 w-auto object-cover"
          />
          <span className="text-white text-2xl font-bold leading-none">
            Investmint
          </span>
        </div>
        <div className="flex gap-6 ml-auto">
          {" "}
          {/* Adjusted for automatic left margin */}
          <Link
            to="/"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Home
          </Link>
          <Link
            to="/test"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Test
          </Link>
          <Link
            to="/Login"
            className="text-white text-lg hover:text-green-300 transition duration-300 ease-in-out hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
