import React from 'react';
import { FaSearch, FaBell, FaSun } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-lg">
      <div className="flex items-center space-x-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search here"
          className="bg-gray-100 p-2 rounded-lg outline-none"
        />
      </div>
      <div className="flex items-center space-x-6">
        <FaSun className="text-gray-500" />
        <FaBell className="text-gray-500" />
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-bold">Zoe Chauhan</p>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
