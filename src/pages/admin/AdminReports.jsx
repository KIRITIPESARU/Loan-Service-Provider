// src\pages\admin\AdminReports.jsx
import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminReports = () => {
  const [reportType, setReportType] = useState('loans');
  const [dateRange, setDateRange] = useState('month');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { get } = useApi();

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await get(`/admin/reports/${reportType}?range=${dateRange}`);
      setReportData(data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchReport();
  }, [reportType, dateRange]);

  const exportReport = async (format) => {
    try {
      const response = await get(`/admin/reports/${reportType}/export?format=${format}&range=${dateRange}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}_report.${format}`;
      a.click();
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
              <p className="text-blue-100 mt-1">Monitor platform performance and metrics</p>
            </div>
            <div className="flex gap-3">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white text-gray-800"
              >
                <option value="loans">Loan Analytics</option>
                <option value="users">User Analytics</option>
                <option value="repayments">Repayment Analytics</option>
                <option value="kyc">KYC Analytics</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white text-gray-800"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
              <button
                onClick={() => exportReport('csv')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Export CSV
              </button>
              <button
                onClick={() => exportReport('pdf')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : reportData ? (
          <div className="p-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <p className="text-sm text-blue-600 mb-1">Total {reportType === 'loans' ? 'Loans' : 'Users'}</p>
                <p className="text-3xl font-bold text-gray-800">{reportData.total}</p>
                <p className="text-xs text-green-600 mt-2">↑ {reportData.growth}% from last period</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <p className="text-sm text-green-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-800">₹{reportData.totalValue?.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <p className="text-sm text-purple-600 mb-1">Average Value</p>
                <p className="text-3xl font-bold text-gray-800">₹{reportData.averageValue?.toLocaleString()}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6">
                <p className="text-sm text-orange-600 mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-800">{reportData.completionRate}%</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportData.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Category</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Count</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Value (₹)</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.breakdown?.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4 text-sm text-gray-800">{item.category}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">{item.count}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">{item.value?.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 text-right">{item.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminReports;