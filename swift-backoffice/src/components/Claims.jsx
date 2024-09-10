import React from 'react';

const claims = [
  { id: '#C1001', name: 'John Doe', date: 'Jan 1, 2024', amount: '$1,200', status: 'Approved' },
  { id: '#C1002', name: 'Jane Smith', date: 'Jan 3, 2024', amount: '$850', status: 'Pending' },
  { id: '#C1003', name: 'Sam Johnson', date: 'Jan 5, 2024', amount: '$600', status: 'Rejected' },
];

const Claims = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Customer Claims</h4>
      <ul>
        {claims.map((claim, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{claim.id}</span>
            <span>{claim.name}</span>
            <span>{claim.date}</span>
            <span>{claim.amount}</span>
            <span className={`text-${claim.status === 'Approved' ? 'green' : claim.status === 'Pending' ? 'yellow' : 'red'}-500`}>
              {claim.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Claims;

