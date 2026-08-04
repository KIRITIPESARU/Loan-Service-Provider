// src\routes\index.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyOTP from '../pages/auth/VerifyOTP';

// Dashboard Pages
import Dashboard from '../pages/dashboard/Dashboard';
import CreditScore from '../pages/dashboard/CreditScore';

// KYC Pages
import KYCVerification from '../pages/kyc/KYCVerification';

// Loan Pages
import ApplyLoan from '../pages/loan/ApplyLoan';
import LoanDetails from '../pages/loan/LoanDetails';
import LoanCalculator from '../pages/loan/LoanCalculator';
import LoanTracker from '../pages/tracking/LoanTracker';
import LoanAgreement from '../pages/agreement/LoanAgreement';

// Repayment Pages
import MakeRepayment from '../pages/repayment/MakeRepayment';

// Consent Pages
import ConsentManagement from '../pages/consent/ConsentManagement';

// Profile Pages
import Profile from '../pages/profile/Profile';

// Settings Pages
import Settings from '../pages/settings/Settings';

// Notifications
import Notifications from '../pages/notifications/Notifications';

// Support Pages
import Support from '../pages/support/Support';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminLoans from '../pages/admin/AdminLoans';
import AdminReports from '../pages/admin/AdminReports';

// Error Pages
import NotFound from '../pages/error/NotFound';
import ServerError from '../pages/error/ServerError';
import Unauthorized from '../pages/error/Unauthorized';

// Legal Pages
import TermsOfService from '../pages/legal/TermsOfService';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';

import LoanSummary from '../pages/dashboard/LoanSummary';
import RepaymentHistory from '../pages/repayment/RepaymentHistory';
import TicketDetails from '../pages/support/TicketDetails';
import MyDocuments from '../pages/documents/MyDocuments';
import ReferralProgram from '../pages/referral/ReferralProgram';

import EmailVerification from '../pages/auth/EmailVerification';
import ResetPassword from '../pages/auth/ResetPassword';
import BankAccounts from '../pages/profile/BankAccounts';
import Offers from '../pages/offers/Offers';
import SecuritySettings from '../pages/settings/SecuritySettings';
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/credit-score" element={<CreditScore />} />
          <Route path="/kyc" element={<KYCVerification />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/loans/:id" element={<LoanDetails />} />
          <Route path="/loans/:id/track" element={<LoanTracker />} />
          <Route path="/loans/:id/agreement" element={<LoanAgreement />} />
          <Route path="/repayments/:repaymentId/pay" element={<MakeRepayment />} />
          <Route path="/consents" element={<ConsentManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<Support />} />
          <Route path="/loans-summary" element={<LoanSummary />} />
          <Route path="/repayments" element={<RepaymentHistory />} />
          <Route path="/repayment-history" element={<RepaymentHistory />} />
          <Route path="/support/tickets/:id" element={<TicketDetails />} />
          <Route path="/documents" element={<MyDocuments />} />
          <Route path="/referral" element={<ReferralProgram />} />
          <Route path="/bank-accounts" element={<BankAccounts />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/security" element={<SecuritySettings />} />
        </Route>

        {/* Legal Pages (Public Routes) */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/loans" element={<AdminLoans />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>

        {/* Error Routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;