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
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Loan ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Borrower</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Purpose</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayLoans.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No loan records available</td>
            </tr>
          ) : (
            displayLoans.map((l) => (
              <tr key={l.id || l.loanId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-indigo-600 whitespace-nowrap">{l.id || l.loanId}</td>
                <td className="px-6 py-4 text-sm text-gray-800 font-medium whitespace-nowrap truncate max-w-[150px]">{l.user || l.borrowerName}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">₹{(l.amount || 0).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm capitalize text-gray-600 whitespace-nowrap">{l.purpose || 'General'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    l.status === 'disbursed' || l.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    l.status === 'approved' ? 'bg-indigo-100 text-indigo-800' :
                    l.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
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