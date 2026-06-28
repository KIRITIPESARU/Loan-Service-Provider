// src/pages/dashboard/WelcomeBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeBanner = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="relative p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
              Welcome back, {userName} 
              <span className="inline-block ml-2 animate-pulse">🎉</span>
            </h1>
          </div>
          <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
            Access your loans, track applications, and manage repayments securely from one place.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button 
              onClick={() => navigate('/apply-loan')}
              className="apply-loan-btn px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <i className="fas fa-plus-circle"></i> Apply Loan
            </button>
            <button 
              onClick={() => navigate('/loans-summary')}
              className="view-apps-btn px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <i className="fas fa-folder-open"></i> View Applications
            </button>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
            <i className="fas fa-hand-holding-heart text-6xl text-blue-600/40"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;