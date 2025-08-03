import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold">
          ReviewVibe
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/home" className="hover:underline">
            Home
          </Link>

          {isAuth ? (
            <Link to="/profile" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
