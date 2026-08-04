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
  const [summary, setSummary] = useState({ totalPaid: 0, pendingAmount: 0, overdueAmount: 0 });
  const { get } = useApi();

  useEffect(() => {
    fetchRepayments();
  }, [currentPage, filter]);

  const fetchRepayments = async () => {
    setLoading(true);
    try {
      const data = await get(`/user/repayments?page=${currentPage}&status=${filter}`);
      setRepayments(data?.repayments || []);
      setTotalPages(data?.totalPages || 1);
      setSummary(data?.summary || { totalPaid: 0, pendingAmount: 0, overdueAmount: 0 });
    }
    catch (error) { console.error('Failed to fetch repayments:', error); }
    finally { setLoading(false); }
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      overdue: 'bg-rose-100 text-rose-700 border-rose-200',
      failed: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return badges[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: '✅',
      pending: '⏳',
      overdue: '⚠️',
      failed: '❌'
    };
    return icons[status] || '📌';
  };

  const downloadReceipt = async (repaymentId) => {
    try {
      const response = await get(`/repayments/${repaymentId}/receipt`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${repaymentId}.pdf`;
      a.click();
    }
    catch (error) { console.error('Failed to download receipt:', error); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-12 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full transform -translate-x-6 translate-y-6"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">📊</span>
              <h2 className="text-3xl font-bold text-white">Repayment History</h2>
            </div>
            <p className="text-emerald-100 text-lg">Track and manage all your loan repayments in one place</p>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-emerald-100 text-sm">Total Paid</p>
                <p className="text-white text-2xl font-bold">₹{summary.totalPaid?.toLocaleString() || 0}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-amber-100 text-sm">Pending</p>
                <p className="text-white text-2xl font-bold">₹{summary.pendingAmount?.toLocaleString() || 0}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-rose-100 text-sm">Overdue</p>
                <p className="text-white text-2xl font-bold">₹{summary.overdueAmount?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex gap-2 p-1 bg-gray-100/50 rounded-xl overflow-x-auto">
            {['all', 'paid', 'pending', 'overdue'].map((status) => (
              <button 
                key={status} 
                onClick={() => setFilter(status)}
                className={`flex-1 min-w-[80px] py-3 px-4 rounded-xl font-medium text-sm capitalize transition-all duration-300 ${
                  filter === status
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {status === 'all' && '📋 All'}
                {status === 'paid' && '✅ Paid'}
                {status === 'pending' && '⏳ Pending'}
                {status === 'overdue' && '⚠️ Overdue'}
              </button>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : !repayments || repayments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-7xl mb-6 animate-bounce">📭</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Repayment Records</h3>
              <p className="text-gray-500">You haven't made any repayments yet</p>
              <div className="mt-6 flex justify-center gap-4">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm">💰 Start Repaying</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm">📅 Check Due Dates</span>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Repayment ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loan ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Paid On</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {(repayments || []).map((repayment, index) => (
                      <tr 
                        key={repayment.id} 
                        className={`hover:bg-emerald-50/50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-900 font-medium">{repayment.repaymentId}</td>
                        <td className="px-6 py-4 text-sm font-mono text-gray-600">{repayment.loanId}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          ₹{repayment.amount?.toLocaleString() || 0}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(repayment.dueDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                          {new Date(repayment.dueDate) < new Date() && repayment.status !== 'paid' && (
                            <span className="ml-2 text-rose-500 text-xs font-bold">⚠️ Overdue</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {repayment.paidOn ? new Date(repayment.paidOn).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(repayment.status)}`}>
                            {getStatusIcon(repayment.status)}
                            {repayment.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {repayment.status === 'paid' && (
                              <button 
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200 text-sm font-medium"
                                onClick={() => downloadReceipt(repayment.id)}
                              >
                                📄 Receipt
                              </button>
                            )}
                            {repayment.status === 'pending' && (
                              <button 
                                className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
                                onClick={() => window.location.href = `/repayments/${repayment.id}/pay`}
                              >
                                💳 Pay Now
                              </button>
                            )}
                            {repayment.status === 'overdue' && (
                              <button 
                                className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium animate-pulse"
                                onClick={() => window.location.href = `/repayments/${repayment.id}/pay`}
                              >
                                ⚡ Pay Now
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            </>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <span className="text-2xl block mb-2">💳</span>
            <p className="text-sm font-medium text-gray-700">Easy Payments</p>
            <p className="text-xs text-gray-500">Pay your dues securely</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <span className="text-2xl block mb-2">📄</span>
            <p className="text-sm font-medium text-gray-700">Digital Receipts</p>
            <p className="text-xs text-gray-500">Download payment receipts</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <span className="text-2xl block mb-2">🔔</span>
            <p className="text-sm font-medium text-gray-700">Payment Reminders</p>
            <p className="text-xs text-gray-500">Never miss a due date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentHistory;