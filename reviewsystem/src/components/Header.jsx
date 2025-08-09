import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiFillHome } from "react-icons/ai"; // Home icon

function Header() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <header className="w-full border-b-2 border-yellow-300/40 bg-yellow-100 dark:bg-black dark:border-gray-900 py-4 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Left - Site name */}
        <Link to="/home" className="text-xl font-medium text-yellow-400 dark:text-yellow-200">
          The <span className="text-black dark:text-white">Opinionated</span>
        </Link>

        {/* Right - Nav & Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* Home Icon */}
          <Link to="/home" className="hover:opacity-80 transition-opacity">
            <AiFillHome className="text-2xl text-black dark:text-yellow-200" />
          </Link>

          {/* Profile / Login */}
          {isAuth ? (
            <Link to="/profile" className="hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-pink-50 border border-pink-300 dark:bg-yellow-200/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-black dark:text-yellow-200"
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

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
