import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import SignUp from './components/SignUp';  
import Login from './components/Login';  
import Dashboard from './pages/Dashboard';  
import HomePage from './components/HomePage';  // Make sure to import HomePage
import Claims from './components/Claims';
import CustomerRecords from './components/CustomerRecords';
import Certificates from './components/Certificates';
import PolicyChecking from './components/PolicyChecking';
import Comparison from './components/Comparison';
import Single from './components/Single';
import AccountManagement from './components/AccountManagement';
import Calendar from './components/Calendar';

function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<HomePage />} />  
        <Route path="/signin" element={<Login />} />  
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested Routes or exact paths for Dashboard components */}
        </Route>  
        <Route path="/Claims" element={<Claims />} />  {/* Ensure path is "/Claims" */}
        <Route path="/customer-records" element={<CustomerRecords />} />  
        <Route path="/certificates" element={<Certificates />} />  
        <Route path="/policy-checking" element={<PolicyChecking />} />
        <Route path="/single" element={<Single />} />
        <Route path="/comparison" element={<Comparison />} />  
        <Route path="/account-management" element={<AccountManagement />} />  
        <Route path="/calendar" element={<Calendar />} />  
      </Routes>  
    </Router>  
  );  
}  

export default App;
