// src/pages/dashboard/ActivityFeed.jsx
import React from 'react';

const ActivityFeed = ({ activities = [] }) => {
  const getStatusBadge = (status, type) => {
    const badges = {
      completed: { color: "bg-green-100 text-green-700", icon: "fa-check-circle", text: "Completed" },
      verified: { color: "bg-blue-100 text-blue-700", icon: "fa-shield-check", text: "Verified" },
      approved: { color: "bg-indigo-100 text-indigo-700", icon: "fa-thumbs-up", text: "Approved" },
      linked: { color: "bg-purple-100 text-purple-700", icon: "fa-link", text: "Linked" },
      pending: { color: "bg-orange-100 text-orange-700", icon: "fa-clock", text: "Pending" }
    };
    return badges[status] || badges.completed;
  };

  const getActivityIcon = (type) => {
    const icons = {
      emi_paid: "fas fa-credit-card",
      kyc: "fas fa-id-card",
      home_loan: "fas fa-home",
      bank_link: "fas fa-university",
      payment_reminder: "fas fa-bell"
    };
    return icons[type] || "fas fa-bell";
  };

  const getActivityColor = (type) => {
    const colors = {
      emi_paid: "emerald",
      kyc: "blue",
      home_loan: "indigo",
      bank_link: "purple",
      payment_reminder: "orange"
    };
    return colors[type] || "gray";
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-12 text-center">
        <i className="fas fa-inbox text-5xl text-slate-300 mb-4"></i>
        <p className="text-slate-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mt-2">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-history text-slate-500"></i> Recent Activity
        </h2>
        <button className="text-sm text-indigo-600 font-medium hover:underline">
          View All <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((activity, idx) => {
          const badge = getStatusBadge(activity.status, activity.type);
          const iconClass = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div key={activity.id || idx} className="p-5 hover:bg-slate-50 transition flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-${colorClass}-100 flex items-center justify-center text-xl text-${colorClass}-700`}>
                <i className={`${iconClass}`}></i>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between items-center gap-1">
                  <h4 className="font-semibold text-slate-800">{activity.title}</h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <i className="far fa-clock"></i> {activity.date}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-0.5">{activity.amount}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${badge.color}`}>
                  {badge.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* subtle footer note */}
      <div className="bg-slate-50 px-6 py-3 text-center text-xs text-slate-400 border-t border-slate-100">
        <i className="fas fa-shield-alt"></i> Your loan activities are updated in real-time
      </div>
    </div>
  );
};

export default ActivityFeed;