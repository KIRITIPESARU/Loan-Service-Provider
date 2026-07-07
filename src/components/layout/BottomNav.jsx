// src/components/layout/BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: '📊', label: 'Home' },
    { path: '/apply-loan', icon: '📝', label: 'Apply' },
    { path: '/loans-summary', icon: '💰', label: 'Loans' },
    { path: '/repayments', icon: '💳', label: 'Pay' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex justify-around items-center px-2 py-1 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] pb-safe">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link key={item.path} to={item.path} 
            className={`flex flex-col items-center justify-center w-full h-16 transition-all duration-300 relative ${active ? 'text-indigo-600' : 'text-slate-500 hover:bg-slate-50 relative top-1 rounded-xl'}`}>
            <span className={`text-2xl transition-all duration-300 ${active ? '-translate-y-2' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold transition-all duration-300 absolute bottom-1.5 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {item.label}
            </span>
            {active && (
              <span className="absolute -top-1 w-1 h-1 rounded-full bg-indigo-600" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
