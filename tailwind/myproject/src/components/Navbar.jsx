import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-black-600">
              BikeSellers
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/brands" className="text-gray-700 hover:text-blue-600">
              Brands
            </Link>
            <Link to="/compare" className="text-gray-700 hover:text-blue-600">
              Compare
            </Link>
            { /* <Link to="/dealers" className="text-gray-700 hover:text-blue-600">
              Dealers
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;