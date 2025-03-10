import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = ({ scrollToFeatured, scrollToUsedBikes }) => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-black-600">
              WheelsBazar
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {location.pathname !== "/post" && (
              <Link
                to="/post"
                className="text-white text-md bg-black p-2 rounded-[7px]"
              >
                Post For Free
              </Link>
            )}
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <button
              onClick={scrollToFeatured || (() => {})}
              className="text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              Brands
            </button>
            <button
              onClick={scrollToUsedBikes || (() => {})}
              className="text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              Used-Bikes
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <span className="text-2xl cursor-pointer">👤</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-5 w-65 bg-white shadow-lg rounded-lg p-4 z-50">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {user?.name || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {user?.email || "N/A"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-18 text-left text-white bg-red-500 hover:bg-red-600 mt-2 p-2 rounded-md cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;