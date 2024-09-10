import React from 'react';

const Metrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">Successful Claims</h4>
        <p className="text-3xl font-bold">1,200</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">Customer Records</h4>
        <p className="text-3xl font-bold">8,500</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">Certificates Issued</h4>
        <p className="text-3xl font-bold">3,200</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-semibold">Policies Checked</h4>
        <p className="text-3xl font-bold">4,700</p>
      </div>
    </div>
  );
};

export default Metrics;
