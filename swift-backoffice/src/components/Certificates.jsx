import React from 'react';

const certificates = [
  { id: '#C1001', name: 'Health Insurance', issueDate: 'Jan 1, 2024', customer: 'John Doe' },
  { id: '#C1002', name: 'Car Insurance', issueDate: 'Jan 3, 2024', customer: 'Jane Smith' },
];

const Certificates = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Certificates of Insurance</h4>
      <ul>
        {certificates.map((certificate, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{certificate.id}</span>
            <span>{certificate.name}</span>
            <span>{certificate.issueDate}</span>
            <span>{certificate.customer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;
