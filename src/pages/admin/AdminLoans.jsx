// src\pages\admin\AdminLoans.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { get, post } = useApi();

  useEffect(() => {
    fetchLoans();
  }, [currentPage, filter]);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const data = await get(`/admin/loans?page=${currentPage}&status=${filter}`);
      setLoans(data.loans);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (loanId, status) => {
    try {
      await post(`/admin/loans/${loanId}/status`, { status });
      fetchLoans();
    } catch (error) {
      console.error('Failed to update loan status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'yellow',
      'approved': 'green',
      'rejected': 'red',
      'disbursed': 'blue',
      'active': 'indigo',
      'completed': 'gray',
      'defaulted': 'red'
    };
    return colors[status] || 'gray';
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Loan Management</h2>
              <p className="text-blue-100 mt-1">Review and manage loan applications</p>
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected', 'disbursed', 'active'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                    filter === status
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-700 text-white hover:bg-blue-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Borrower</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">EMI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : loans.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No loans found</td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{loan.loanId}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{loan.borrowerName}</div>
                      <div className="text-xs text-gray-500">{loan.borrowerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{loan.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{loan.tenure} months</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{Math.round(loan.emi).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(loan.status)}-100 text-${getStatusColor(loan.status)}-800`}>
                        {loan.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(loan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={loan.status}
                        onChange={(e) => handleStatusUpdate(loan.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                        <option value="disbursed">Disburse</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default AdminLoans;