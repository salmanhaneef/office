import React from 'react';

const transactions = [
  { code: '#8764', product: 'Lip Scrub', date: 'Dec 28', order: 800, amount: '$48,000' },
  { code: '#8765', product: 'Argan Oil', date: 'Dec 27', order: 820, amount: '$73,800' },
  { code: '#8766', product: 'Sugar Scrub', date: 'Dec 27', order: 900, amount: '$36,000' },
  { code: '#8767', product: 'Body Wash', date: 'Dec 26', order: 850, amount: '$59,500' },
];

const Transactions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h4 className="text-lg font-semibold mb-4">Latest Transaction</h4>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Code</th>
            <th className="py-2">Product Name</th>
            <th className="py-2">Date</th>
            <th className="py-2">Order</th>
            <th className="py-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="py-2">{transaction.code}</td>
              <td className="py-2">{transaction.product}</td>
              <td className="py-2">{transaction.date}</td>
              <td className="py-2">{transaction.order}</td>
              <td className="py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
