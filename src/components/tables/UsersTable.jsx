// src/components/tables/UsersTable.jsx
import React from 'react';

const UsersTable = ({ users = [], showAll = false }) => {
  const displayUsers = showAll
    ? [
        { id: 1, name: 'Sandeep Kumar', email: 'sandeep@example.com', phone: '+91 91111 22222', role: 'user', kycStatus: 'pending', joined: 'May 31, 2026' },
        { id: 2, name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 92222 33333', role: 'user', kycStatus: 'verified', joined: 'May 30, 2026' },
        { id: 3, name: 'Vikram Singh', email: 'vikram10@example.com', phone: '+91 93333 44444', role: 'user', kycStatus: 'verified', joined: 'May 28, 2026' }
      ]
    : users;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users available</td>
            </tr>
          ) : (
            displayUsers.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow">
                      {u.name?.charAt(0)}
                    </div>
                    <span className="ml-3 font-semibold text-gray-800 text-sm">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    u.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
                    u.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {u.kycStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm capitalize text-gray-600">{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
