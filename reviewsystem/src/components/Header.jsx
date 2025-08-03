import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold">
          ReviewVibe
        </Link>
        <nav className="flex gap-4">
          <Link to="/home" className="hover:underline">
            Home
          </Link>

          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
