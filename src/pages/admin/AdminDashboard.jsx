// src\pages\admin\AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import StatsCard from '../../components/common/StatsCard';
import UsersTable from '../../components/tables/UsersTable';
import LoansTable from '../../components/tables/LoansTable';
import KYCQueue from '../../components/common/KYCQueue';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeLoans: 0,
    pendingKYC: 0,
    totalDisbursed: 0,
    defaultRate: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentLoans, setRecentLoans] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { get } = useApi();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsData, usersData, loansData] = await Promise.all([
        get('/admin/stats'),
        get('/admin/users/recent'),
        get('/admin/loans/recent')
      ]);
      setStats(statsData);
      setRecentUsers(usersData);
      setRecentLoans(loansData);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage users, loans, and system settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" color="blue" />
        <StatsCard title="Active Loans" value={stats.activeLoans} icon="📋" color="green" />
        <StatsCard title="Pending KYC" value={stats.pendingKYC} icon="🆔" color="orange" />
        <StatsCard title="Total Disbursed" value={`₹${(stats.totalDisbursed / 10000000).toFixed(1)}Cr`} icon="💰" color="purple" />
        <StatsCard title="Default Rate" value={`${stats.defaultRate}%`} icon="⚠️" color="red" />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['overview', 'users', 'loans', 'kyc', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h3>
              <UsersTable users={recentUsers} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Loan Applications</h3>
              <LoansTable loans={recentLoans} />
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <KYCQueue />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <UsersTable users={[]} showAll={true} />
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <LoansTable loans={[]} showAll={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;