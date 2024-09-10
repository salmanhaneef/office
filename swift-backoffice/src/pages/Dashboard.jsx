import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Metrics from "../components/Metrics";
import Charts from "../components/Charts";
import Claims from "../components/Claims";
import CustomerRecords from "../components/CustomerRecords";
import Certificates from "../components/Certificates";
import PolicyChecking from "../components/PolicyChecking";
import AccountManagement from "../components/AccountManagement";
import Calendar from "../components/Calendar";

import axios from "../axiosConfig";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.data.success) {
        navigate("/"); // Redirect to home page after successful logout
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Navbar />
          <Metrics />
          <Charts />
          <div className="bg-gray-100 min-h-screen">
            <Claims />
            <CustomerRecords />
            <Certificates />
            <PolicyChecking />
            <AccountManagement />
            <Calendar />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
