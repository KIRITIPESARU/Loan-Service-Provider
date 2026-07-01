// src/pages/dashboard/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from '../../hooks/useApi';
import StatsCard from '../../components/common/StatsCard';
import FeatureCard from '../../components/common/FeatureCard';
import LoanSummary from './LoanSummary';
import ActivityFeed from './ActivityFeed';
import QuickActions from './QuickActions';
import WelcomeBanner from './WelcomeBanner';
import EmptyLoanState from './EmptyLoanState';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { get, loading } = useApi();
  
  const [stats, setStats] = useState({
    activeLoans: 0,
    totalBorrowed: 0,
    nextPayment: null,
    creditScore: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loanSummary, setLoanSummary] = useState({
    totalEmi: 0,
    nextDue: null,
    loans: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsData, activityData, loanData] = await Promise.all([
        get('/user/dashboard/stats'),
        get('/user/dashboard/activity'),
        get('/user/loan/summary')
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
      setLoanSummary(loanData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real-time subscription for live updates
  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    if (!wsUrl) return; // Prevent connecting to a dummy URL which throws network errors

    const ws = new WebSocket(wsUrl);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'STATS_UPDATE') {
        setStats(prev => ({ ...prev, ...data.payload }));
      } else if (data.type === 'NEW_ACTIVITY') {
        setRecentActivity(prev => [data.payload, ...prev.slice(0, 4)]);
      } else if (data.type === 'LOAN_UPDATE') {
        setLoanSummary(prev => ({ ...prev, ...data.payload }));
      }
    };

    ws.onerror = (error) => {
      console.warn('WebSocket encountered an error or is unavailable.');
    };

    return () => {
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
      } else {
        ws.close();
      }
    };
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-7">
        {/* Welcome Banner */}
        <WelcomeBanner userName={user?.fullName?.split(' ')[0]} />

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            title="Active Loans"
            value={stats.activeLoans}
            icon={<i className="fas fa-layer-group text-xl text-blue-600"></i>}
            trend={stats.activeLoans > 0 ? { value: '+2', isPositive: true } : null}
            gradient="from-blue-50 to-blue-100"
          />
          <StatsCard
            title="Total Borrowed"
            value={`₹${stats.totalBorrowed?.toLocaleString() || 0}`}
            icon={<i className="fas fa-indian-rupee-sign text-xl text-emerald-600"></i>}
            gradient="from-emerald-50 to-emerald-100"
          />
          <StatsCard
            title="Next Payment"
            value={stats.nextPayment || "No Due"}
            icon={<i className="fas fa-calendar-alt text-xl text-amber-600"></i>}
            subtitle={stats.nextPayment ? "in 12 days" : null}
            gradient="from-amber-50 to-amber-100"
          />
          <StatsCard
            title="Credit Score"
            value={stats.creditScore || "N/A"}
            icon={<i className="fas fa-chart-line text-xl text-violet-600"></i>}
            trend={stats.creditScore ? { value: '+12 pts', isPositive: true } : null}
            gradient="from-violet-50 to-violet-100"
          />
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<i className="fas fa-bolt text-2xl text-indigo-600"></i>}
            title="Easy Application"
            description="Complete your loan application in just a few minutes."
            iconBg="bg-indigo-50"
          />
          <FeatureCard
            icon={<i className="fas fa-file-alt text-2xl text-sky-600"></i>}
            title="Paperless Process"
            description="Upload documents digitally and track status online."
            iconBg="bg-sky-50"
          />
          <FeatureCard
            icon={<i className="fas fa-shield-alt text-2xl text-emerald-600"></i>}
            title="Quick Verification"
            description="Fast approval and verification powered by secure technology."
            iconBg="bg-emerald-50"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Loan Summary Section */}
          <div className="lg:col-span-2">
            {stats.activeLoans === 0 ? (
              <EmptyLoanState onApply={() => window.location.href = '/apply-loan'} />
            ) : (
              <LoanSummary data={loanSummary} nextPaymentDate={stats.nextPayment} />
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <ActivityFeed activities={recentActivity} />
      </div>
    </div>
  );
};

// Skeleton Loader Component
const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8 space-y-7">
      <div className="bg-white rounded-3xl shadow-sm p-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-64 mb-3"></div>
        <div className="h-5 bg-slate-200 rounded w-96 mb-6"></div>
        <div className="flex gap-4">
          <div className="h-12 bg-slate-200 rounded-xl w-32"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-40"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-24 mb-3"></div>
            <div className="h-8 bg-slate-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Dashboard;