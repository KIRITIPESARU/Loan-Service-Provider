// src\pages\tracking\LoanTracker.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Timeline from '../../components/common/Timeline';

const LoanTracker = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchTrackingData();
  }, [id]);

  const fetchTrackingData = async () => {
    try {
      const [loanData, timelineData] = await Promise.all([
        get(`/loans/${id}`),
        get(`/loans/${id}/tracking`)
      ]);
      setLoan(loanData);
      setTimeline(timelineData);
    } catch (error) {
      console.error('Failed to fetch tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'applied': 'blue',
      'document_verification': 'yellow',
      'credit_check': 'orange',
      'approved': 'green',
      'rejected': 'red',
      'disbursed': 'purple',
      'active': 'indigo',
      'completed': 'green'
    };
    return colors[status] || 'gray';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'applied': '📝',
      'document_verification': '📄',
      'credit_check': '🔍',
      'approved': '✅',
      'rejected': '❌',
      'disbursed': '💰',
      'active': '📊',
      'completed': '🏁'
    };
    return icons[status] || '📍';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Loan Tracking</h2>
          <p className="text-blue-100 mt-1">
            Track your loan application status in real-time
          </p>
        </div>

        <div className="p-8">
          {/* Current Status Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Status</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getStatusIcon(loan.status)}</span>
                  <h3 className="text-2xl font-bold text-gray-800 capitalize">
                    {loan.status?.replace('_', ' ')}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Loan ID</p>
                <p className="font-mono text-lg font-semibold text-gray-800">{loan.loanId}</p>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Application Progress</h3>
            <Timeline items={timeline} />
          </div>

          {/* Additional Information */}
          {loan.status === 'document_verification' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Document Verification in Progress</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    Our team is reviewing your documents. This usually takes 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {loan.status === 'approved' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-800">Loan Approved!</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your loan has been approved. Funds will be disbursed within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Estimated Timeline */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Estimated Timeline</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Application Submitted</span>
                <span className="font-medium">Completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Document Verification</span>
                <span className="font-medium">2-3 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Credit Check</span>
                <span className="font-medium">1-2 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Loan Approval</span>
                <span className="font-medium">1 day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Disbursal</span>
                <span className="font-medium">24 hours after approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanTracker;