import React from 'react';

const customers = [
  { name: 'John Doe', policy: 'Health Insurance', date: 'Jan 1, 2024', status: 'Active' },
  { name: 'Jane Smith', policy: 'Car Insurance', date: 'Jan 3, 2024', status: 'Active' },
  { name: 'Sam Johnson', policy: 'Life Insurance', date: 'Jan 5, 2024', status: 'Pending' },
];

const CustomerRecords = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Customer Records</h4>
      <ul>
        {customers.map((customer, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{customer.name}</span>
            <span>{customer.policy}</span>
            <span>{customer.date}</span>
            <span className={`text-${customer.status === 'Active' ? 'green' : 'yellow'}-500`}>{customer.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerRecords;
