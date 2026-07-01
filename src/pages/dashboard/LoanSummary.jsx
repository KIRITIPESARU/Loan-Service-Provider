// src/pages/dashboard/LoanSummary.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';

const LoanSummary = ({ data, nextPaymentDate }) => {
  const [localData, setLocalData] = useState(null);
  const [loading, setLoading] = useState(!data);
  const { get } = useApi();

  useEffect(() => {
    if (!data) {
      const fetchData = async () => {
        try {
          const res = await get('/user/loan/summary');
          setLocalData(res);
        }
        catch (error) {
          console.error(error);
        }
        finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [data]);

  const displayData = data || localData;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!displayData) return null;
  const { totalEmi, nextDue, loans = [] } = displayData;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-chart-pie text-indigo-500"></i> Loan Portfolio
        </h2>
        {data && (
          <button onClick={() => window.location.href='/loans-summary'} 
            className="text-sm text-indigo-600 font-medium hover:underline">
            View Details <i className="fas fa-arrow-right ml-1"></i>
          </button>
        )}
      </div>
      
      <div className="p-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">Total EMI (Monthly)</p>
            <p className="text-2xl font-bold text-slate-800">{totalEmi || '₹12,450'}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-slate-500 text-sm">Next Due Date</p>
            <p className="text-2xl font-bold text-amber-600">{nextDue || nextPaymentDate}</p>
          </div>
        </div>

        {/* Loan List */}
        <div className="space-y-6">
          {loans.map((loan, index) => (
            <div key={index} className="border-b border-slate-100 pb-5 last:border-0 relative">
              <div className="mb-4">
                <h4 className="font-bold text-lg text-slate-800">{loan.name}</h4>
                <div className="mt-3 text-sm text-slate-600 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">Loan Amount</span>
                    <span className="font-semibold text-slate-800 text-base">₹{loan.amount?.toLocaleString()}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">Remaining Amount</span>
                    <span className="font-semibold text-slate-800 text-base">₹{loan.remainingAmount?.toLocaleString()}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">EMI Amount</span>
                    <span className="font-semibold text-indigo-700 text-base">₹{loan.emi?.toLocaleString()}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">Total Tenure</span>
                    <span className="font-medium text-slate-800">{loan.tenure} Months</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">Remaining Tenure</span>
                    <span className="font-medium text-slate-800">{loan.remainingTenure} Months</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide">Loan Status</span>
                    <span className="inline-flex">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full text-xs">{loan.status}</span>
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${loan.progress}%` }}>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 mt-2 font-medium">
                <span className="text-indigo-600">{loan.progress}% Repaid</span>
                <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md"><i className="far fa-calendar-alt mr-1"></i> Next Due: {loan.nextDue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;