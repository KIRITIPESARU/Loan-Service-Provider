// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import UsersTable from '../../components/tables/UsersTable';
import LoansTable from '../../components/tables/LoansTable';
import KYCQueue from '../../components/common/KYCQueue';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Admin Stats Card Component
const AdminStatsCard = ({ title, value, icon, color, growth }) => {
  const gradients = {
    blue: 'from-blue-500 to-blue-700',
    emerald: 'from-emerald-400 to-emerald-600',
    amber: 'from-amber-400 to-amber-600',
    indigo: 'from-indigo-500 to-indigo-700',
    rose: 'from-rose-500 to-rose-700',
  };

  const bgGradient = gradients[color] || gradients.blue;
  const isPositiveGrowth = growth && growth.startsWith('+');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between group overflow-hidden relative">
      {/* Decorative Blur */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-100 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white text-lg shadow-lg`}>
          {icon}
        </div>
      </div>
      
      {growth && (
        <div className="relative z-10 flex items-center gap-1.5 mt-2 text-xs font-semibold">
          <span className={`flex items-center gap-0.5 ${isPositiveGrowth ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositiveGrowth ? '↑' : '↓'} {growth.replace('+', '').replace('-', '')}
          </span>
          <span className="text-gray-400 font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: '0',
    activeLoans: '0',
    pendingKYC: '0',
    totalDisbursed: '₹0',
    defaultRate: '0%'
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentLoans, setRecentLoans] = useState([]);
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
      setStats({
        totalUsers: statsData.totalUsers.toLocaleString(),
        activeLoans: statsData.activeLoans.toLocaleString(),
        pendingKYC: statsData.pendingKYC.toString(),
        totalDisbursed: `₹${(statsData.totalDisbursed / 10000000).toFixed(1)}Cr`,
        defaultRate: `${statsData.defaultRate}%`
      });
      setRecentUsers(usersData);
      setRecentLoans(loansData);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const chartData = [
    { name: 'Jan', value: 450000 }, { name: 'Feb', value: 520000 },
    { name: 'Mar', value: 780000 }, { name: 'Apr', value: 650000 },
    { name: 'May', value: 890000 }, { name: 'Jun', value: 1150000 }
  ];

  const pieData = [
    { name: 'Personal Loans', value: 55 },
    { name: 'Home Loans', value: 30 },
    { name: 'Auto Loans', value: 15 }
  ];

  const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Overview</h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">System performance and global metrics</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="flex-shrink-0 bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all">
            + New Application
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
        <AdminStatsCard title="Total Users" value={stats.totalUsers} icon="👥" color="blue" growth="+12.5%" />
        <AdminStatsCard title="Active Loans" value={stats.activeLoans} icon="📋" color="emerald" growth="+8.1%" />
        <AdminStatsCard title="Pending Approvals" value={stats.pendingKYC} icon="🆔" color="amber" growth="-2.4%" />
        <AdminStatsCard title="Funds Disbursed" value={stats.totalDisbursed} icon="💰" color="indigo" growth="+15.3%" />
        <AdminStatsCard title="Default Rate" value={stats.defaultRate} icon="⚠️" color="rose" growth="-0.5%" />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Monthly Disbursements</h3>
            <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 rounded-lg p-2 focus:ring-0 cursor-pointer">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Portfolio Distribution</h3>
          <p className="text-xs text-gray-500 mb-6 font-medium">By Active Loan Types</p>
          <div className="flex-1 flex justify-center items-center min-h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index] }}></div>
                  <span className="font-semibold text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Recent Loan Applications</h3>
              <a href="/admin/loans" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View All →</a>
            </div>
            <LoansTable loans={recentLoans} />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
              <a href="/admin/users" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">View All →</a>
            </div>
            <UsersTable users={recentUsers} />
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                Action Queue
                <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-xs font-bold">12</span>
              </h3>
            </div>
            <div className="p-4">
              <KYCQueue />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;