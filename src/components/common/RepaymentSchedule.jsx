// src/components/common/RepaymentSchedule.jsx
import React from 'react';

const RepaymentSchedule = ({ repayments = [] }) => {
  // Prepopulated premium mock repayments list if none are passed
  const displayRepayments = repayments.length > 0
    ? repayments
    : [
        { id: 1, installmentNo: 1, dueDate: '10 May 2026', amount: 12450, principal: 10000, interest: 2450, status: 'paid' },
        { id: 2, installmentNo: 2, dueDate: '10 June 2026', amount: 12450, principal: 10100, interest: 2350, status: 'pending' },
        { id: 3, installmentNo: 3, dueDate: '10 July 2026', amount: 12450, principal: 10200, interest: 2250, status: 'pending' },
        { id: 4, installmentNo: 4, dueDate: '10 Aug 2026', amount: 12450, principal: 10300, interest: 2150, status: 'pending' }
      ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Repayment Schedule</h3>
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Installment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">EMI Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Principal / Interest</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayRepayments.map((rep) => (
              <tr key={rep.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-bold text-gray-800">#{rep.installmentNo}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{rep.dueDate}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{rep.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  ₹{rep.principal.toLocaleString()} / ₹{rep.interest.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    rep.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rep.status?.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepaymentSchedule;
