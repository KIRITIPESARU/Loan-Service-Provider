// src\pages\repayment\MakeRepayment.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import PaymentGateway from '../../components/common/PaymentGateway';
import Button from '../../components/common/Button';

const MakeRepayment = () => {
  const { loanId, repaymentId } = useParams();
  const navigate = useNavigate();
  const [repayment, setRepayment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const { get, post } = useApi();

  useEffect(() => {
    fetchRepaymentDetails();
  }, [repaymentId]);

  const fetchRepaymentDetails = async () => {
    try {
      const data = await get(`/repayments/${repaymentId}`);
      setRepayment(data);
    } catch (error) {
      console.error('Failed to fetch repayment:', error);
    }
  };

  const handlePayment = async (paymentDetails) => {
    setLoading(true);
    try {
      await post(`/repayments/${repaymentId}/pay`, paymentDetails);
      navigate(`/loans/${loanId}`, { state: { paymentSuccess: true } });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!repayment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Make Repayment</h2>
          <p className="text-green-100 mt-1">
            Secure payment gateway powered by RBI-approved partners
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">{new Date(repayment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-medium">₹{repayment.principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Amount:</span>
                    <span className="font-medium">₹{repayment.interest.toLocaleString()}</span>
                  </div>
                  {repayment.lateFee > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Late Fee:</span>
                      <span className="font-medium">₹{repayment.lateFee.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold text-green-600">
                        ₹{(repayment.principal + repayment.interest + (repayment.lateFee || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Important Note</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Payment will be processed immediately. Please ensure sufficient balance in your account.
                      A confirmation receipt will be sent to your registered email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <PaymentGateway
                amount={repayment.principal + repayment.interest + (repayment.lateFee || 0)}
                onPayment={handlePayment}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeRepayment;