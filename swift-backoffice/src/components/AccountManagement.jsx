import React from 'react';

const accounts = [
  { id: '#A1001', customer: 'John Doe', accountStatus: 'Active', renewalDate: 'Jan 1, 2024' },
  { id: '#A1002', customer: 'Jane Smith', accountStatus: 'Pending', renewalDate: 'Jan 3, 2024' },
];

const AccountManagement = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Account Management</h4>
      <ul>
        {accounts.map((account, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{account.id}</span>
            <span>{account.customer}</span>
            <span className={`text-${account.accountStatus === 'Active' ? 'green' : 'yellow'}-500`}>
              {account.accountStatus}
            </span>
            <span>{account.renewalDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountManagement;
