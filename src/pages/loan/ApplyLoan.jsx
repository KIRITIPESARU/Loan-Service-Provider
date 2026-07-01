// src\pages\loan\ApplyLoan.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { applyForLoan } from '../../store/thunks/loanThunks';
import { calculateEMI, calculateEligibility } from '../../utils/calculators';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loanDetails, setLoanDetails] = useState({
    amount: '',
    tenure: 12,
    purpose: 'personal',
    interestRate: 12,
    emi: 0
  });
  const [eligibility, setEligibility] = useState({
    eligible: false,
    maxAmount: 0,
    message: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Dynamically update interest rate based on loan purpose
  useEffect(() => {
    const INTEREST_RATES = {
      personal: 12,
      home: 8.5,
      car: 9.5,
      education: 7.5,
      business: 15,
      debt: 13
    };
    const rate = INTEREST_RATES[loanDetails.purpose] || 12;
    setLoanDetails(prev => ({ ...prev, interestRate: rate }));
  }, [loanDetails.purpose]);

  useEffect(() => {
    const emi = calculateEMI(loanDetails.amount, loanDetails.interestRate, loanDetails.tenure);
    setLoanDetails(prev => ({ ...prev, emi }));
  }, [loanDetails.amount, loanDetails.interestRate, loanDetails.tenure]);

  useEffect(() => {
    const eligibilityResult = calculateEligibility(user, loanDetails.amount);
    setEligibility(eligibilityResult);
  }, [loanDetails.amount, user]);

  // Handle countdown redirection timer
  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showSuccessPopup, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };

  const handleSubmit = async () => {
    if (!eligibility.eligible) {
      alert('You are not eligible for this loan amount');
      return;
    }
    const result = await dispatch(applyForLoan(loanDetails));
    if (result && result.success) {
      setShowSuccessPopup(true);
      setCountdown(10);
    }
  };

  const getEligibilityColor = () => {
    if (eligibility.eligible) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Apply for Loan</h2>
          <p className="text-blue-100 mt-1">
            Get instant approval and quick disbursal
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={loanDetails.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {loanDetails.amount && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Min: ₹10,000</span>
                      <span>Max: ₹50,00,000</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${Math.min((loanDetails.amount / 5000000) * 100, 100)}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Purpose
                </label>
                <select
                  name="purpose"
                  value={loanDetails.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="personal">Personal Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="car">Car Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="debt">Debt Consolidation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Months)
                </label>
                <input
                  type="range"
                  name="tenure"
                  min="6"
                  max="60"
                  step="6"
                  value={loanDetails.tenure}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="relative w-full h-6 mt-1.5">
                  {[
                    { value: 6, percent: 0, align: 'left' },
                    { value: 12, percent: 11.11, align: 'center' },
                    { value: 24, percent: 33.33, align: 'center' },
                    { value: 36, percent: 55.56, align: 'center' },
                    { value: 48, percent: 77.78, align: 'center' },
                    { value: 60, percent: 100, align: 'right' }
                  ].map((tick) => {
                    let style = { position: 'absolute' };
                    if (tick.align === 'left') {
                      style.left = '0%';
                    } else if (tick.align === 'right') {
                      style.right = '0%';
                    } else {
                      style.left = `${tick.percent}%`;
                      style.transform = 'translateX(-50%)';
                    }
                    const isActive = parseInt(loanDetails.tenure) === tick.value;
                    return (
                      <span
                        key={tick.value}
                        className={`text-xs transition-colors duration-200 ${
                          isActive ? 'text-blue-600 font-bold scale-110' : 'text-gray-500'
                        }`}
                        style={style}
                      >
                        {tick.value}
                      </span>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {loanDetails.tenure} months ({Math.floor(loanDetails.tenure / 12)} years {loanDetails.tenure % 12} months)
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">₹{parseInt(loanDetails.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{loanDetails.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="font-semibold">{loanDetails.tenure} months</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Monthly EMI:</span>
                  <span className="font-bold text-blue-600">₹{Math.round(loanDetails.emi).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Interest:</span>
                  <span>₹{Math.round(loanDetails.emi * loanDetails.tenure - loanDetails.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Payment:</span>
                  <span>₹{Math.round(loanDetails.emi * loanDetails.tenure).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Eligibility Status:</span>
                  <span className={`font-bold ${getEligibilityColor()}`}>
                    {eligibility.eligible ? '✅ Eligible' : '❌ Not Eligible'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{eligibility.message}</p>
                {!eligibility.eligible && eligibility.maxAmount > 0 && (
                  <p className="text-xs text-blue-600 mt-1">
                    Maximum eligible amount: ₹{eligibility.maxAmount.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button onClick={handleSubmit} className="flex-1" disabled={!loanDetails.amount || !eligibility.eligible}>
              Apply for Loan
            </Button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save Draft
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative transform scale-100 transition-all duration-300 border border-gray-100">
            {/* Close Icon Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success Circle and Icon */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 text-green-500 mb-6 animate-bounce">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Thank you for your application.
              </p>
              <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl py-3 px-4 mb-6">
                <p className="text-sm text-blue-700 font-medium font-sans">
                  Redirecting to Home page in <span className="font-bold text-lg text-blue-800">{countdown}</span> seconds...
                </p>
              </div>
              
              {/* Manual Actions */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => navigate('/')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                  Go to Home Now
                </Button>
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLoan;