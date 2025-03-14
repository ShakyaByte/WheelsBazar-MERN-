import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Wheels Bazar</h3>
            <p className="text-gray-400"> WheelsBazar is your go-to marketplace for buying and selling vehicles with ease. List your products effortlessly, connect with potential buyers, and explore a variety of listings—all in one place. Start your journey with WheelsBazar today!</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/bikes" className="text-gray-400 hover:text-white">Bikes</Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-400 hover:text-white">Compare</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: support@bikewaleclone.com</p>
            <p className="text-gray-400">Phone: +91 1234567890</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;