// src/components/layout/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const adminMenus = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/users', icon: '👥', label: 'Users' },
    { path: '/admin/loans', icon: '📝', label: 'Applications' },
    { path: '/admin/kyc', icon: '🔎', label: 'KYC Checks' },
    { path: '/admin/approvals', icon: '✅', label: 'Approvals' },
    { path: '/admin/transactions', icon: '💳', label: 'Transactions' },
    { path: '/admin/reports', icon: '📈', label: 'Reports' },
  ];

  const bottomMenus = [
    { path: '/admin/notifications', icon: '🔔', label: 'Notifications' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
    { path: '/admin/profile', icon: '👤', label: 'Profile' }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 bg-slate-900 border-r border-slate-800 z-30 transition-all duration-300 overflow-hidden ${isOpen ? 'w-[260px]' : 'w-[72px]'}`}>
      <div className={`flex items-center mt-5 mb-8 ${isOpen ? 'px-5 gap-3' : 'justify-center mx-auto w-full'}`}>
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-black">A</span>
        </div>
        {isOpen && <span className="text-lg font-black text-white whitespace-nowrap">Admin Portal</span>}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col gap-2">
        <div className="px-3">
          {isOpen && <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Management</div>}
          <div className="flex flex-col gap-1">
            {adminMenus.map((item) => {
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-3 py-2 rounded-xl transition-all duration-200 group
                    ${!isOpen ? 'justify-center mx-auto w-10 h-10' : 'px-3'}
                    ${active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}>
                  <span className={!active ? 'opacity-80 group-hover:opacity-100' : ''}>{item.icon}</span>
                  {isOpen && <span className="text-sm font-semibold">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-auto px-3 border-t border-slate-800 pt-4 pb-4">
        {isOpen && <div className="px-3 mb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">System</div>}
        <div className="flex flex-col gap-1">
          {bottomMenus.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 py-2 rounded-xl transition-all duration-200 group
                ${!isOpen ? 'justify-center mx-auto w-10 h-10' : 'px-3'}
                ${isActive(item.path) ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}>
              <span className="opacity-80 group-hover:opacity-100">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
