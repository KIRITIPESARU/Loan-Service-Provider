// E:\Git\Loan-Service-Provider\src\pages\loan\LoanDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import LoanStatus from '../../components/common/LoanStatus';
import RepaymentSchedule from '../../components/common/RepaymentSchedule';

const LoanDetails = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const data = await get(`/loans/${id}`);
      setLoan(data);
    } catch (error) {
      console.error('Failed to fetch loan details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loan not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Loan Details</h2>
              <p className="text-blue-100 mt-1">Loan ID: {loan.loanId}</p>
            </div>
            <LoanStatus status={loan.status} />
          </div>
        </div>

        <div className="p-8">
          {/* Loan Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">Loan Amount</p>
              <p className="text-2xl font-bold text-gray-800">₹{loan.amount.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 mb-1">Interest Rate</p>
              <p className="text-2xl font-bold text-gray-800">{loan.interestRate}%</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600 mb-1">Monthly EMI</p>
              <p className="text-2xl font-bold text-gray-800">₹{Math.round(loan.emi).toLocaleString()}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600 mb-1">Tenure</p>
              <p className="text-2xl font-bold text-gray-800">{loan.tenure} months</p>
            </div>
          </div>

          {/* Loan Progress */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Progress</h3>
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-500"
                style={{ width: `${(loan.amountPaid / loan.amount) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Paid: ₹{loan.amountPaid?.toLocaleString() || 0}</span>
              <span>Remaining: ₹{(loan.amount - (loan.amountPaid || 0)).toLocaleString()}</span>
            </div>
          </div>

          {/* Repayment Schedule */}
          <RepaymentSchedule repayments={loan.repaymentSchedule} />

          {/* Documents */}
          {loan.documents && loan.documents.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
              <div className="space-y-2">
                {loan.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">{doc.name}</span>
                    </div>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;