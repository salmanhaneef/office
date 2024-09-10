import React, { useState } from "react";  
import { Link } from "react-router-dom";  
import {  
  FaHome,  
  FaUser,  
  FaFileAlt,  
  FaClipboardCheck,  
  FaUserShield,  
} from "react-icons/fa";  
import { BsCalendar } from "react-icons/bs";  
import { FaChevronDown } from "react-icons/fa";  

const Sidebar = () => {  
  const [isPolicyDropdownOpen, setPolicyDropdownOpen] = useState(false);  

  const togglePolicyDropdown = () => {  
    setPolicyDropdownOpen(!isPolicyDropdownOpen);  
  };  

  return (  
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">  
      <div className="p-6 text-2xl font-bold">Swift Back Office</div>  
      <nav className="flex-1">  
        <ul>  
          <li className="p-4 hover:bg-gray-700">  
            <Link to="/Claims" className="flex items-center">  
              <FaClipboardCheck className="mr-2" /> Claims  
            </Link>  
          </li>  
          <li className="p-4 hover:bg-gray-700">  
            <Link to="/customer-records" className="flex items-center">  
              <FaUser className="mr-2" /> Customer Records  
            </Link>  
          </li>  
          <li className="p-4 hover:bg-gray-700">  
            <Link to="/certificates" className="flex items-center">  
              <FaFileAlt className="mr-2" /> Certificates  
            </Link>  
          </li>  
          <li className="relative p-4 hover:bg-gray-700">  
            <div className="flex items-center cursor-pointer" onClick={togglePolicyDropdown}>  
              <FaClipboardCheck className="mr-2" /> Policy Checking  
              <FaChevronDown className="ml-2" />  
            </div>  
            {isPolicyDropdownOpen && (  
              <ul className="absolute left-0 mt-2 bg-gray-800 text-white rounded shadow-lg">  
                <li className="p-2 hover:bg-gray-600">  
                  <Link to="/comparison">Comparison</Link>  
                </li>  
                <li className="p-2 hover:bg-gray-600">  
                  <Link to="/single">Single</Link>  
                </li>  
              </ul>  
            )}  
          </li>  
          <li className="p-4 hover:bg-gray-700">  
            <Link to="/account-management" className="flex items-center">  
              <FaUserShield className="mr-2" /> Account Management  
            </Link>  
          </li>  
          <li className="p-4 hover:bg-gray-700">  
            <Link to="/calendar" className="flex items-center">  
              <BsCalendar className="mr-2" /> Calendar  
            </Link>  
          </li>  
        </ul>  
      </nav>  
    </div>  
  );  
};  

export default Sidebar;