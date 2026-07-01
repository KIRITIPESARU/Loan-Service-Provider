// src\pages\repayment\RepaymentHistory.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Pagination from '../../components/common/Pagination';

const RepaymentHistory = () => {
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');
  const { get } = useApi();

  useEffect(() => {
    fetchRepayments();
  }, [currentPage, filter]);

  const fetchRepayments = async () => {
    setLoading(true);
    try {
      const data = await get(`/user/repayments?page=${currentPage}&status=${filter}`);
      setRepayments(data.repayments);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch repayments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
      failed: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const downloadReceipt = async (repaymentId) => {
    try {
      const response = await get(`/repayments/${repaymentId}/receipt`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${repaymentId}.pdf`;
      a.click();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Repayment History</h2>
              <p className="text-blue-100 mt-1">Track all your loan repayments</p>
            </div>
            <div className="flex gap-2">
              {['all', 'paid', 'pending', 'overdue'].map((status) => (
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repayment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : repayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-gray-500">No repayment records found</p>
                  </td>
                </tr>
              ) : (
                repayments.map((repayment) => (
                  <tr key={repayment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{repayment.repaymentId}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{repayment.loanId}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{repayment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(repayment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {repayment.paidOn ? new Date(repayment.paidOn).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(repayment.status)}`}>
                        {repayment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {repayment.status === 'paid' && (
                        <button
                          onClick={() => downloadReceipt(repayment.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Receipt
                        </button>
                      )}
                      {repayment.status === 'pending' && (
                        <button
                          onClick={() => window.location.href = `/repayments/${repayment.id}/pay`}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Pay Now
                        </button>
                      )}
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

export default RepaymentHistory;