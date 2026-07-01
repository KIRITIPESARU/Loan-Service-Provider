// src/components/common/LoanStatus.jsx
import React from 'react';

const LoanStatus = ({ status = 'pending' }) => {
  const statusStyles = {
    active: 'bg-green-50 text-green-700 border-green-200',
    disbursed: 'bg-green-100 text-green-800 border-green-300',
    approved: 'bg-blue-50 text-blue-700 border-blue-200',
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    rejected: 'bg-red-50 text-red-700 border-red-200'
  };

  const style = statusStyles[status?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border tracking-wider ${style}`}>
      {status}
    </span>
  );
};

export default LoanStatus;
