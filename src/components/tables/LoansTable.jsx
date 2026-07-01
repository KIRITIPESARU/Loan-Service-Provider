// src/components/tables/LoansTable.jsx
import React from 'react';

const LoansTable = ({ loans = [], showAll = false }) => {
  const displayLoans = showAll
    ? [
        { id: 'LN-9012', user: 'Sandeep Kumar', amount: 200000, purpose: 'Personal', status: 'pending', date: 'May 31, 2026' },
        { id: 'LN-9011', user: 'Neha Gupta', amount: 500000, purpose: 'Education', status: 'approved', date: 'May 30, 2026' },
        { id: 'LN-9010', user: 'Vikram Singh', amount: 1500000, purpose: 'Home', status: 'disbursed', date: 'May 28, 2026' }
      ]
    : loans;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayLoans.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No loan records available</td>
            </tr>
          ) : (
            displayLoans.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{l.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">{l.user}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{l.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm capitalize text-gray-600">{l.purpose}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    l.status === 'disbursed' || l.status === 'active' ? 'bg-green-100 text-green-800' :
                    l.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    l.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoansTable;
