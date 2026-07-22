// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

// SVG Icons
const Icon = ({ name }) => {
  const icons = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />,
    activity: <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
    tasks: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
    loans: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    reports: <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    document: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    card: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
    account: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    support: <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  };
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {icons[name] || icons.dashboard}
    </svg>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState({ tools: true, admin: false });

  // Map user structure
  const generalMenus = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', badge: '8' },
    { path: '/repayment-history', icon: 'activity', label: 'Activity' },
    { path: '/offers', icon: 'tasks', label: 'My Offers', badge: '5' },
  ];

  const toolsMenus = [
    { path: '/credit-score', icon: 'chart', label: 'Credit Score' },
    { path: '/loans-summary', icon: 'loans', label: 'Loans Tracker' },
    { path: '/repayments', icon: 'card', label: 'Payments' },
    { path: '/kyc', icon: 'account', label: 'KYC Checks' },
    { path: '/documents', icon: 'document', label: 'Reporting', children: [
        { path: '/loan-calculator', label: 'Calculator' },
        { path: '/documents', label: 'Database', badge: '3' },
        { path: '/apply-loan', label: 'Applications' }
      ]
    }
  ];

  const bottomMenus = [
    { path: '/notifications', icon: 'bell', label: 'Notifications' },
    { path: '/support', icon: 'support', label: 'Help Centre' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ];

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const MenuItem = ({ item, isNested = false }) => {
    const active = isActive(item.path);
    return (
      <Link to={item.path}
        className={`flex items-center gap-3 py-1.5 rounded-lg transition-all duration-200 group relative
          ${!isOpen ? 'justify-center mx-auto w-10 h-10' : 'px-3 mx-2'}
          ${active && !isNested ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
          ${isNested && active ? 'text-gray-900 font-medium' : ''}
        `}>
        {!isNested && (
          <div className={active ? 'text-blue-600' : 'text-blue-600/70 group-hover:text-blue-600'}>
            <Icon name={item.icon} />
          </div>
        )}
        
        {isOpen && (
          <>
            <span className={`text-[13.5px] flex-1 truncate ${active && !isNested ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
            {item.badge && (
              <span className="bg-gray-100 text-gray-400 text-[11px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  const DropdownMenu = ({ item, isExpanded, onToggle }) => {
    const activeChild = item.children?.some(child => isActive(child.path));
    
    return (
      <div className="mb-0.5 relative">
        <button 
          onClick={isOpen ? onToggle : () => { setIsOpen(true); setTimeout(onToggle, 150); }}
          className={`flex items-center gap-3 py-1.5 w-full rounded-lg transition-all duration-200 group
            ${!isOpen ? 'justify-center mx-auto w-10 h-10' : 'px-3 mx-2'}
            ${isExpanded && isOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
          `}>
          <div className={activeChild || isExpanded ? 'text-blue-600' : 'text-blue-600/70 group-hover:text-blue-600'}>
            <Icon name={item.icon} />
          </div>
          
          {isOpen && (
            <span className={`text-[13.5px] flex-1 text-left truncate ${isExpanded ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          )}
          {isOpen && (
            <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {isExpanded && isOpen && (
          <div className="mt-1 ml-6 relative">
            {/* Tree connecting line */}
            <div className="absolute left-[5px] top-0 bottom-3 w-[1px] bg-gray-200"></div>
            
            <div className="flex flex-col gap-0.5">
              {item.children.map((child, index) => (
                <div key={child.path} className="relative flex items-center">
                  <div className="absolute left-[5px] w-3 h-[1px] bg-gray-200"></div>
                  <div className="flex-1 ml-5">
                    <MenuItem item={child} isNested={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <aside className={`hidden md:flex flex-col fixed top-3 left-3 bottom-3 bg-white/60 backdrop-blur-xl border border-gray-200 shadow-sm rounded-[24px] z-30 transition-all duration-300 overflow-hidden ${isOpen ? 'w-[260px]' : 'w-[68px]'}`}>
        <div className={`flex items-center mt-5 mb-4 ${isOpen ? 'px-5 gap-3' : 'justify-center mx-auto w-full'}`}>
          {isOpen && (
            <button onClick={() => setIsOpen(false)} className="ml-auto p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors shrink-0 cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Toggle Button - Fixed at top when sidebar is closed */}
        {!isOpen && (
          <div className="absolute top-3 right-3">
            <button onClick={() => setIsOpen(true)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer" title="Expand Sidebar">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Search Bar - Only when open */}
        {isOpen && (
          <div className="px-4 mb-6">
            <div className="h-8 bg-gray-100 rounded-lg flex items-center px-3 gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {/* <input type="text" placeholder="Search" className="bg-transparent text-[13px] outline-none w-full text-gray-700 placeholder-gray-400" />
              <span className="text-[10px] font-medium text-gray-400 bg-white px-1.5 py-0.5 rounded shadow-sm shrink-0">⌘S</span> */}
            </div>
          </div>
        )}

        {/* Main Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-4 flex flex-col gap-6">
          {/* General Section */}
          <div>
            {isOpen && <div className="px-6 mb-2 text-[11px] font-medium text-gray-400">General</div>}
            <div className="flex flex-col gap-0.5">
              {generalMenus.map((item) => (
                <MenuItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* Work Tools Section */}
          <div>
            {isOpen && <div className="px-6 mb-2 text-[11px] font-medium text-gray-400">Work tools</div>}
            <div className="flex flex-col gap-0.5">
              {toolsMenus.map((item) => 
                item.children ? (
                  <DropdownMenu key={item.path} item={item} isExpanded={expandedMenus.tools} onToggle={() => toggleMenu('tools')} />
                ) : (
                  <MenuItem key={item.path} item={item} />
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-1 pb-4">
          {bottomMenus.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 py-1.5 rounded-lg transition-all duration-200 group
                ${!isOpen ? 'justify-center mx-auto w-10 h-10' : 'px-4'}
                text-gray-400 hover:text-gray-600 hover:bg-gray-50
              `}>
              <Icon name={item.icon} />
              {isOpen && <span className="text-[13px] font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* User Card */}
        <div className={`mx-3 mb-3 p-1.5 rounded-[12px] border border-gray-200 shadow-sm flex items-center transition-all ${isOpen ? 'gap-2.5' : 'justify-center'}`}>
          <div className="relative">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-[30px] h-[30px] rounded-full object-cover" />
            ) : (
              <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-white text-[13px] font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white"></div>
          </div>
          {isOpen && (
            <div className="flex flex-col flex-1 truncate pr-1">
              <span className="text-[13.5px] font-semibold text-gray-900 truncate">{user?.fullName || 'Brendan Smitham'}</span>
              <span className="text-[11px] text-gray-500 truncate">{user?.email || 'brendansmith@gmail.com'}</span>
            </div>
          )}
          {isOpen && (
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;