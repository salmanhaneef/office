import React from 'react';

const policies = [
  { id: '#P1001', customer: 'John Doe', policyType: 'Health Insurance', status: 'Pending' },
  { id: '#P1002', customer: 'Jane Smith', policyType: 'Car Insurance', status: 'Checked' },
];

const PolicyChecking = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Policy Checking</h4>
      <ul>
        {policies.map((policy, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{policy.id}</span>
            <span>{policy.customer}</span>
            <span>{policy.policyType}</span>
            <span className={`text-${policy.status === 'Checked' ? 'green' : 'yellow'}-500`}>{policy.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyChecking;
