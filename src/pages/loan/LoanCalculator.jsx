// src\pages\loan\LoanCalculator.jsx
import React, { useState, useEffect } from 'react';
import { calculateEMI, calculateTotalInterest } from '../../utils/calculators';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(24);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenure);
    const calculatedInterest = calculateTotalInterest(loanAmount, interestRate, tenure);
    setEmi(calculatedEmi);
    setTotalInterest(calculatedInterest);
    setTotalPayment(loanAmount + calculatedInterest);
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Loan EMI Calculator</h2>
          <p className="text-blue-100 mt-1">
            Calculate your monthly payments and total interest
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount: {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹10,000</span>
                  <span>₹50,00,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate: {interestRate}% p.a.
                </label>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6%</span>
                  <span>24%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Tenure: {tenure} months ({Math.floor(tenure/12)} years {tenure%12} months)
                </label>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6 months</span>
                  <span>60 months</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly EMI:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(emi)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Principal Amount:</span>
                  <span className="font-semibold text-gray-800">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-orange-600">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-800 font-semibold">Total Payment:</span>
                  <span className="text-xl font-bold text-green-600">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Tip: A higher down payment or shorter tenure can significantly reduce the total interest paid.
                </p>
              </div>
            </div>
          </div>

          {/* Amortization Table Preview */}
          <div className="mt-8">
            <details className="group">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                View Amortization Schedule
              </summary>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">EMI</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Principal</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: Math.min(6, tenure) }).map((_, index) => {
                      const balance = loanAmount - (emi * (index + 1) - totalInterest * ((index + 1) / tenure));
                      return (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(emi)}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(emi * 0.7)}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(emi * 0.3)}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(Math.max(0, balance))}</td>
                        </tr>
                      );
                    })}
                    {tenure > 6 && (
                      <tr>
                        <td colSpan="5" className="px-4 py-2 text-center text-sm text-gray-500">
                          ... and {tenure - 6} more months
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;