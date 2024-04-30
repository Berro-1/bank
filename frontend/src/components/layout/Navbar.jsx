import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex gap-2 text-dark font-bold	">
      <Link to="/">Home</Link>
      <Link to="/test">test</Link>
    </div>
  );
}
