// src\components\layout\Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState({
    loans: false,
    payments: false,
    settings: false
  });

  // Menu items with icons and paths
  const mainMenus = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard', color: 'blue' },
    { path: '/credit-score', icon: '📈', label: 'Credit Score', color: 'purple' },
    { path: '/offers', icon: '🎁', label: 'Offers', color: 'orange' },
  ];

  const loanMenus = [
    { path: '/apply-loan', icon: '📝', label: 'Apply Loan', color: 'green' },
    { path: '/loans-summary', icon: '💰', label: 'My Loans', color: 'indigo' },
    { path: '/loan-calculator', icon: '🧮', label: 'Calculator', color: 'yellow' },
    { path: '/loan-tracker', icon: '📍', label: 'Track Application', color: 'teal' },
  ];

  const paymentMenus = [
    { path: '/repayments', icon: '💳', label: 'Repayments', color: 'red' },
    { path: '/repayment-history', icon: '📜', label: 'History', color: 'orange' },
    { path: '/auto-pay', icon: '⚡', label: 'Auto-Pay', color: 'purple' },
  ];

  const profileMenus = [
    { path: '/kyc', icon: '🆔', label: 'KYC Verification', color: 'indigo' },
    { path: '/documents', icon: '📄', label: 'Documents', color: 'blue' },
    { path: '/bank-accounts', icon: '🏦', label: 'Bank Accounts', color: 'green' },
    { path: '/profile', icon: '👤', label: 'Profile', color: 'gray' },
  ];

  const supportMenus = [
    { path: '/support', icon: '💬', label: 'Support', color: 'teal' },
    { path: '/referral', icon: '🤝', label: 'Refer & Earn', color: 'pink' },
    { path: '/notifications', icon: '🔔', label: 'Notifications', color: 'yellow' },
  ];

  const settingsMenus = [
    { path: '/settings', icon: '⚙️', label: 'General', color: 'gray' },
    { path: '/security', icon: '🔒', label: 'Security', color: 'red' },
    { path: '/consents', icon: '✅', label: 'Consents', color: 'blue' },
  ];

  const adminMenus = [
    { path: '/admin', icon: '📊', label: 'Dashboard', color: 'purple' },
    { path: '/admin/users', icon: '👥', label: 'Users', color: 'blue' },
    { path: '/admin/loans', icon: '💰', label: 'Loans', color: 'green' },
    { path: '/admin/reports', icon: '📈', label: 'Reports', color: 'orange' },
    { path: '/admin/kyc', icon: '🆔', label: 'KYC Reviews', color: 'yellow' },
    { path: '/admin/support', icon: '💬', label: 'Support Tickets', color: 'teal' },
  ];

  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const MenuItem = ({ item }) => (
    <Link
      to={item.path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive(item.path)
          ? `bg-${item.color}-600 text-white shadow-md`
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="text-xl">{item.icon}</span>
      <span className="font-medium flex-1">{item.label}</span>
      {isActive(item.path) && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
      )}
    </Link>
  );

  const DropdownMenu = ({ title, icon, menus, isExpanded, onToggle, color }) => (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isExpanded ? `bg-${color}-50 text-${color}-700` : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="text-xl">{icon}</span>
        <span className="font-medium flex-1 text-left">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="ml-8 mt-1 space-y-1 animate-slideDown">
          {menus.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                isActive(item.path)
                  ? `bg-${item.color}-100 text-${item.color}-700 font-medium`
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transition-all duration-300 flex flex-col ${
          isOpen ? 'w-72' : 'w-20'
        } lg:w-72 overflow-hidden`}
      >
        {/* Logo Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">💰</span>
            </div>
            {isOpen && (
              <div className="flex-1">
                <h1 className="text-white font-bold text-xl">LSP Platform</h1>
                <p className="text-blue-200 text-xs">Loan Service Provider</p>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        {isOpen && user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.fullName || 'User'}</p>
                <p className="text-xs text-gray-500">{user.email || 'user@example.com'}</p>
                {user.role === 'admin' && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {!isOpen && (
            <div className="flex flex-col items-center space-y-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            </div>
          )}

          {/* Main Menu */}
          <div className="mb-4">
            {!isOpen && <div className="text-center text-xs text-gray-400 mb-2">MAIN</div>}
            {mainMenus.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </div>

          {/* Loans Section */}
          <div className="mb-4">
            <DropdownMenu
              title="Loans"
              icon="💰"
              menus={loanMenus}
              isExpanded={expandedMenus.loans}
              onToggle={() => toggleMenu('loans')}
              color="green"
            />
          </div>

          {/* Payments Section */}
          <div className="mb-4">
            <DropdownMenu
              title="Payments"
              icon="💳"
              menus={paymentMenus}
              isExpanded={expandedMenus.payments}
              onToggle={() => toggleMenu('payments')}
              color="red"
            />
          </div>

          {/* Profile Section */}
          <div className="mb-4">
            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {isOpen ? 'Profile' : '👤'}
            </div>
            {profileMenus.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </div>

          {/* Support Section */}
          <div className="mb-4">
            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {isOpen ? 'Support' : '💬'}
            </div>
            {supportMenus.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </div>

          {/* Settings Section */}
          <div className="mb-4">
            <DropdownMenu
              title="Settings"
              icon="⚙️"
              menus={settingsMenus}
              isExpanded={expandedMenus.settings}
              onToggle={() => toggleMenu('settings')}
              color="gray"
            />
          </div>

          {/* Admin Section (Conditional) */}
          {isAdmin && (
            <div className="mb-4">
              <div className="px-4 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                {isOpen ? 'Admin Panel' : '👑'}
              </div>
              {adminMenus.map((item) => (
                <MenuItem key={item.path} item={item} />
              ))}
            </div>
          )}

          {/* Legal Links */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/terms"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-sm ${
                  !isOpen && 'justify-center'
                }`}
              >
                <span className="text-lg">📜</span>
                {isOpen && <span>Terms of Service</span>}
              </Link>
              <Link
                to="/privacy"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-sm ${
                  !isOpen && 'justify-center'
                }`}
              >
                <span className="text-lg">🔒</span>
                {isOpen && <span>Privacy Policy</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 ${
              !isOpen && 'justify-center'
            }`}
          >
            <span className="text-xl">🚪</span>
            {isOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
};

export default Sidebar;