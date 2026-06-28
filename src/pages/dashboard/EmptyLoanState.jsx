// src/pages/dashboard/EmptyLoanState.jsx
import React from 'react';

const EmptyLoanState = ({ onApply }) => {
  return (
    <div className="text-center py-12 gradient-border rounded-xl">
      <i className="fas fa-coins text-5xl text-slate-300 mb-4"></i>
      <h3 className="text-2xl font-semibold text-slate-700">No Loans Yet</h3>
      <p className="text-slate-500 max-w-sm mx-auto mt-2">
        Ready to get started with your first loan? The process is quick and completely paperless.
      </p>
      <button onClick={onApply} className="apply-loan-btn mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700">
        Apply for Loan Now →
      </button>
    </div>
  );
};

export default EmptyLoanState;