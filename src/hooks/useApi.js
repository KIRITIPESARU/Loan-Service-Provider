// src/hooks/useApi.js
import { useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  // Date generators
  const getRelativeDateStr = (daysOffset, format = 'short') => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    if (format === 'long') {
      return d.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }); // e.g., 10 June 2026
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); // e.g., May 10, 2026
  };

  const todayStr = getRelativeDateStr(0);
  const yesterdayStr = getRelativeDateStr(-1);
  const nextMonthLong = getRelativeDateStr(30, 'long');
  const past5 = getRelativeDateStr(-5);
  const past30 = getRelativeDateStr(-30);
  const past60 = getRelativeDateStr(-60);

  // Deep mocked data store
  const mockData = {
    '/user/dashboard/stats': {
      activeLoans: 2,
      totalBorrowed: 450000,
      nextPayment: nextMonthLong,
      creditScore: 785
    },
    '/user/dashboard/activity': [
      { id: 1, title: 'Loan EMI Paid', date: past5, type: 'payment', amount: '₹12,450', status: 'success' },
      { id: 2, title: 'KYC Verification', date: past30, type: 'kyc', status: 'verified' },
      { id: 3, title: 'Home Loan Approved', date: past60, type: 'loan', amount: '₹3,00,000', status: 'approved' },
      { id: 4, title: 'Bank Account Linked', date: past60, type: 'bank', status: 'linked' }
    ],
    '/user/loan/summary': {
      activeLoansCount: 2,
      totalPrincipal: 450000,
      totalEMI: 18500,
      loans: [
        { 
          id: 'LN-1092', 
          name: 'Home Renovation Loan',
          amount: 300000, 
          remainingAmount: 250000,
          tenure: 24, 
          remainingTenure: 20,
          emi: 12450, 
          status: 'Active', 
          lender: 'SBI', 
          nextDue: nextMonthLong,
          progress: 30
        },
        { 
          id: 'LN-8832', 
          name: 'Education Loan',
          amount: 150000, 
          remainingAmount: 140000,
          tenure: 30, 
          remainingTenure: 28,
          emi: 6050, 
          status: 'Active', 
          lender: 'HDFC', 
          nextDue: nextMonthLong,
          progress: 10
        }
      ]
    },
    '/user/credit-score': {
      score: 785,
      rating: 'Excellent',
      history: [
        { month: 'Jan', score: 760 },
        { month: 'Feb', score: 765 },
        { month: 'Mar', score: 770 },
        { month: 'Apr', score: 780 },
        { month: 'May', score: 785 }
      ],
      factors: [
        { name: 'Payment History', status: 'Excellent', impact: 'High' },
        { name: 'Credit Utilization', status: 'Good', impact: 'High' },
        { name: 'Credit Age', status: 'Fair', impact: 'Medium' },
        { name: 'Total Accounts', status: 'Good', impact: 'Low' }
      ]
    },
    '/user/offers': [
      { id: 'OF-01', title: 'Pre-Approved Personal Loan', amount: 200000, interestRate: 10.5, tenure: 36, processingFee: '₹1,999', badge: 'Best Value' },
      { id: 'OF-02', title: 'Instant Education Loan Boost', amount: 500000, interestRate: 8.9, tenure: 60, processingFee: 'Free', badge: 'Special rate' },
      { id: 'OF-03', title: 'Car Loan Express Approval', amount: 800000, interestRate: 9.2, tenure: 48, processingFee: '₹2,500' }
    ],
    '/notifications': [
      { id: 1, title: 'EMI Reminder', message: `Your monthly payment of ₹12,450 for Loan LN-1092 is due on ${nextMonthLong}.`, read: false, time: '2 hours ago' },
      { id: 2, title: 'KYC Document Verified', message: 'Your PAN and Aadhaar identity details have been successfully verified.', read: true, time: '1 day ago' },
      { id: 3, title: 'Special Offer Just For You!', message: 'Unlock a pre-approved personal loan at an exclusive interest rate of 10.5% p.a.', read: true, time: '3 days ago' }
    ],
    '/user/documents': [
      { id: 'doc-1', name: 'PAN Card.pdf', type: 'PAN', status: 'verified', size: '1.2 MB', date: past30 },
      { id: 'doc-2', name: 'Aadhaar Card.pdf', type: 'Aadhaar', status: 'verified', size: '2.4 MB', date: past30 },
      { id: 'doc-3', name: 'Salary Slips 3 Months.pdf', type: 'Income', status: 'pending', size: '4.8 MB', date: past5 }
    ],
    '/user/bank-accounts': [
      { id: 'bk-1', bankName: 'State Bank of India', accountNumber: '•••• 1234 5678', accountType: 'Savings', status: 'primary', isVerified: true },
      { id: 'bk-2', bankName: 'HDFC Bank', accountNumber: '•••• 9876 5432', accountType: 'Current', status: 'secondary', isVerified: true }
    ],
    '/user/referral': {
      code: 'PESARU13',
      points: 1200,
      referralsCount: 4,
      earnings: '₹4,000',
      history: [
        { id: 1, friendName: 'Amit Sharma', status: 'Disbursed', reward: '500 Points + ₹1,000' },
        { id: 2, friendName: 'Pooja Patel', status: 'Approved', reward: '300 Points' },
        { id: 3, friendName: 'Rahul Verma', status: 'Applied', reward: 'Pending' }
      ]
    },
    '/user/consents': [
      { id: 'c-1', title: 'Credit Bureau Query Consent', purpose: 'Allow retrieval of credit bureau score (CIBIL/Equifax) for eligibility assessment.', status: true, date: past30 },
      { id: 'c-2', title: 'Aadhaar e-KYC Data Consent', purpose: 'Allow extraction of demographics data from UIDAI registry.', status: true, date: past30 },
      { id: 'c-3', title: 'Marketing Communications', purpose: 'Send newsletters, promotional schemes, and loan offers.', status: false, date: past30 }
    ],
    '/admin/stats': {
      totalUsers: 1450,
      activeLoans: 310,
      totalDisbursed: 124500000,
      pendingApprovals: 12,
      lendersCount: 15,
      nbfcPartners: 8
    },
    '/admin/users/recent': [
      { id: 1, name: 'Sandeep Kumar', email: 'sandeep@example.com', date: 'Today at 2:30 PM', role: 'user', kycStatus: 'pending' },
      { id: 2, name: 'Neha Gupta', email: 'neha.g@example.com', date: 'Today at 1:15 PM', role: 'user', kycStatus: 'verified' },
      { id: 3, name: 'Vikram Singh', email: 'vikram10@example.com', date: 'Yesterday', role: 'user', kycStatus: 'verified' }
    ],
    '/admin/loans/recent': [
      { id: 'LN-9012', user: 'Sandeep Kumar', amount: 200000, purpose: 'Personal', status: 'pending', date: 'Today at 2:30 PM' },
      { id: 'LN-9011', user: 'Neha Gupta', amount: 500000, purpose: 'Education', status: 'approved', date: 'Today at 1:15 PM' },
      { id: 'LN-9010', user: 'Vikram Singh', amount: 1500000, purpose: 'Home', status: 'disbursed', date: 'Yesterday' }
    ],
    '/support/tickets': [
      { id: 'TK-1002', subject: 'EMI Payment Delay Request', status: 'open', category: 'Repayment', date: todayStr, repliesCount: 2 },
      { id: 'TK-9921', subject: 'KYC Document Failed', status: 'closed', category: 'Verification', date: past5, repliesCount: 4 }
    ]
  };

  // Advanced request resolver matching query paths and regex matches
  const resolveRequest = async (method, url, data) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setLoading(false);

        // Normalize URL - remove query params
        const pathOnly = url.split('?')[0];

        // Exact match in mock data
        if (mockData[pathOnly] !== undefined) {
          resolve(mockData[pathOnly]);
          return;
        }

        // Regex matches for dynamic routing
        // /loans/:id/tracking
        if (pathOnly.match(/^\/loans\/[A-Za-z0-9-]+\/tracking$/)) {
          resolve({
            loanId: 'LN-1092',
            currentStep: 3,
            steps: [
              { id: 1, name: 'Application Submitted', status: 'completed', date: past30, description: 'Application received and registered successfully.' },
              { id: 2, name: 'KYC verification', status: 'completed', date: getRelativeDateStr(-27), description: 'PAN & Aadhaar documents verified.' },
              { id: 3, name: 'Lender Matching', status: 'completed', date: getRelativeDateStr(-25), description: 'Matched with State Bank of India.' },
              { id: 4, name: 'Document Verification', status: 'current', date: past5, description: 'Salary slips under detailed review.' },
              { id: 5, name: 'e-Sign Agreement', status: 'upcoming', date: null, description: 'Sign agreement using Aadhaar OTP.' },
              { id: 6, name: 'Fund Disbursal', status: 'upcoming', date: null, description: 'Direct transfer to primary bank account.' }
            ]
          });
          return;
        }

        // /loans/:id/agreement
        if (pathOnly.match(/^\/loans\/[A-Za-z0-9-]+\/agreement$/)) {
          resolve({
            loanId: 'LN-1092',
            lender: 'State Bank of India',
            borrowerName: 'Pesaru Kireeti',
            amount: 300000,
            rate: 12,
            emi: 12450,
            tenure: 24,
            terms: 'This agreement is executed between the Lender and the Borrower. The Borrower agrees to repay the loan amount of ₹3,00,000 at a fixed interest rate of 12% p.a. in 24 monthly installments. Delay in repayment will attract a penal charge of 2% per month on the overdue EMI. Early repayments are allowed after 6 months without foreclosure charges.'
          });
          return;
        }

        if (pathOnly.match(/^\/loans\/[A-Za-z0-9-]+$/)) {
          resolve({
            id: 'LN-1092',
            amount: 300000,
            purpose: 'Home Renovation',
            emi: 12450,
            tenure: 24,
            interestRate: 12,
            status: 'active',
            lender: 'SBI',
            disbursalDate: past30,
            nextEMI: nextMonthLong,
            paidEMIs: 1,
            repaidAmount: 12450,
            remainingPrincipal: 287550
          });
          return;
        }

        if (pathOnly.match(/^\/support\/tickets\/[A-Za-z0-9-]+$/)) {
          resolve({
            id: 'TK-1002',
            subject: 'EMI Payment Delay Request',
            status: 'open',
            category: 'Repayment',
            date: past5,
            messages: [
              { id: 1, sender: 'user', name: 'Pesaru Kireeti', message: 'Hello, due to a delay in my salary disbursement this month, can I pay my next EMI a bit later without penalties?', time: getRelativeDateStr(-5) + ', 10:00 AM' },
              { id: 2, sender: 'support', name: 'Alok (Support Desk)', message: 'Hello Mr. Kireeti, thank you for reaching out. We can grant a grace period. We have updated our records so that auto-debit will not report a bounce, and penalty charges will be waived for this cycle.', time: getRelativeDateStr(-4) + ', 11:30 AM' }
            ]
          });
          return;
        }

        // /repayments/:repaymentId/receipt
        if (pathOnly.match(/^\/repayments\/[A-Za-z0-9-]+\/receipt$/)) {
          resolve(new Blob(['Mock PDF Content'], { type: 'application/pdf' }));
          return;
        }

        if (pathOnly.match(/^\/repayments\/[A-Za-z0-9-]+$/)) {
          resolve({
            id: 'PM-9012',
            amount: 12450,
            loanId: 'LN-1092',
            dueDate: nextMonthLong,
            status: 'pending',
            penalty: 0
          });
          return;
        }

        // /admin/reports/:reportType
        if (pathOnly.match(/^\/admin\/reports\/[a-z]+$/)) {
          resolve([
            { label: 'Week 1', value: 45 },
            { label: 'Week 2', value: 65 },
            { label: 'Week 3', value: 85 },
            { label: 'Week 4', value: 110 }
          ]);
          return;
        }

        // /admin/users
        if (pathOnly.startsWith('/admin/users')) {
          resolve({
            users: [
              { id: 1, name: 'Sandeep Kumar', email: 'sandeep@example.com', phone: '+91 91111 22222', role: 'user', kycStatus: 'pending' },
              { id: 2, name: 'Neha Gupta', email: 'neha.g@example.com', phone: '+91 92222 33333', role: 'user', kycStatus: 'verified' },
              { id: 3, name: 'Vikram Singh', email: 'vikram10@example.com', phone: '+91 93333 44444', role: 'user', kycStatus: 'verified' }
            ],
            totalPages: 1
          });
          return;
        }

        // /admin/loans
        if (pathOnly.startsWith('/admin/loans')) {
          resolve({
            loans: [
              { id: 'LN-9012', user: 'Sandeep Kumar', amount: 200000, purpose: 'Personal', status: 'pending', date: 'May 31, 2026' },
              { id: 'LN-9011', user: 'Neha Gupta', amount: 500000, purpose: 'Education', status: 'approved', date: 'May 30, 2026' },
              { id: 'LN-9010', user: 'Vikram Singh', amount: 1500000, purpose: 'Home', status: 'disbursed', date: 'May 28, 2026' }
            ],
            totalPages: 1
          });
          return;
        }

        // Default empty list fallback
        resolve([]);
      }, 500);
    });
  };

  const get = async (url, config) => resolveRequest('GET', url, null);
  const post = async (url, data, config) => resolveRequest('POST', url, data);
  const put = async (url, data, config) => resolveRequest('PUT', url, data);
  const del = async (url, config) => resolveRequest('DELETE', url, null);

  return {
    loading,
    get,
    post,
    put,
    delete: del
  };
};
