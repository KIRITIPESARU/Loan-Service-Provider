// src/components/common/KYCQueue.jsx
import React, { useState } from 'react';

const KYCQueue = () => {
  const [queue, setQueue] = useState([
    { id: 1, name: 'Sandeep Kumar', email: 'sandeep@example.com', docType: 'PAN, Aadhaar', date: 'May 31, 2026', riskScore: 'Low Risk' },
    { id: 2, name: 'Radha Roy', email: 'radha.roy@example.com', docType: 'PAN, Income Slip', date: 'May 30, 2026', riskScore: 'Medium Risk' },
    { id: 3, name: 'Mohit Mehta', email: 'mohit.m@example.com', docType: 'Aadhaar, Bank Statement', date: 'May 29, 2026', riskScore: 'High Risk' }
  ]);

  const handleAction = (id, action) => {
    alert(`KYC Application ${action} successfully!`);
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Pending KYC Review Queue</h3>
        <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {queue.length} Tasks Pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queue.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-medium">🎉 Excellent! No pending KYC requests left in the queue.</td>
              </tr>
            ) : (
              queue.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.docType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.riskScore === 'Low Risk' ? 'bg-green-100 text-green-800' :
                      item.riskScore === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleAction(item.id, 'Approved')}
                      className="text-green-600 hover:text-green-800 font-semibold text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'Rejected')}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KYCQueue;
