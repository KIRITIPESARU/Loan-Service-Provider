// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'EMI Due in 5 Days', desc: 'LN-1092 installment of ₹12,450 is due on June 10, 2026.', read: false },
    { id: 2, title: 'KYC Verified Successfully', desc: 'Your PAN and Aadhaar records have been processed.', read: true },
    { id: 3, title: 'New Personal Loan Offer', desc: 'Get pre-approved for up to ₹2,00,000 instantly!', read: true }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-10">
      {/* Search Bar / Menu Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 w-80">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search loans, transactions, tickets..."
            className="bg-transparent text-sm text-gray-800 placeholder-gray-400 w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 border border-gray-200 transition-all flex items-center justify-center relative"
          >
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-pulse"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4 animate-slideDown">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-800">Notifications</h4>
                <button className="text-xs text-blue-600 font-semibold hover:underline">Mark all read</button>
              </div>
              <div className="space-y-3">
                {mockNotifications.map((notif) => (
                  <div key={notif.id} className={`p-2.5 rounded-lg border text-left ${notif.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'}`}>
                    <p className="text-xs font-bold text-gray-800">{notif.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        {user && (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-gray-800">{user.fullName}</p>
                <p className="text-xs text-gray-400">{user.role === 'admin' ? 'Administrator' : 'Borrower'}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-slideDown">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-bold text-gray-800">{user.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>👤</span> My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span>⚙️</span> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 text-left font-medium"
                  >
                    <span>🚪</span> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
