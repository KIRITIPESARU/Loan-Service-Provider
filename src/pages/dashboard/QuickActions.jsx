// src/pages/dashboard/QuickActions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { 
      label: "Apply for Loan", 
      subtitle: "Get instant approval", 
      icon: "fas fa-hand-holding-usd",
      bg: "bg-blue-50",
      hoverBg: "hover:bg-blue-100",
      onClick: () => navigate('/apply-loan')
    },
    { 
      label: "Make Payment", 
      subtitle: "Pay your EMI", 
      icon: "fas fa-credit-card",
      bg: "bg-emerald-50",
      hoverBg: "hover:bg-emerald-100",
      onClick: () => navigate('/payments')
    },
    { 
      label: "Check KYC", 
      subtitle: "Complete verification", 
      icon: "fas fa-id-card",
      bg: "bg-purple-50",
      hoverBg: "hover:bg-purple-100",
      onClick: () => navigate('/kyc')
    },
    { 
      label: "Get Support", 
      subtitle: "24/7 assistance", 
      icon: "fas fa-headset",
      bg: "bg-amber-50",
      hoverBg: "hover:bg-amber-100",
      onClick: () => navigate('/support')
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden sticky top-6">
      <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-bolt text-amber-500"></i> Quick Actions
        </h2>
      </div>
      
      <div className="p-5 space-y-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={`quick-action-btn w-full flex items-center gap-4 p-3 rounded-xl ${action.bg} ${action.hoverBg} transition-all group`}
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
              <i className={`${action.icon} text-slate-700 text-lg`}></i>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-slate-800">{action.label}</p>
              <p className="text-xs text-slate-500">{action.subtitle}</p>
            </div>
            <i className="fas fa-chevron-right text-slate-400 text-sm group-hover:translate-x-1 transition"></i>
          </button>
        ))}
      </div>

      <div className="bg-indigo-50/40 m-4 p-3 rounded-xl text-xs text-indigo-700 flex items-center gap-2">
        <i className="fas fa-lock text-indigo-500"></i> Secure & encrypted transactions
      </div>
    </div>
  );
};

export default QuickActions;