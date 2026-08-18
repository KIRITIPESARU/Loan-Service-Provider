// src/components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BottomNav from './BottomNav';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <div className="flex bg-[#f3f4f6] h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[72px]'}`}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative z-0">
          <Outlet />
        </main>
        <div className="hidden md:block">
          <Footer />
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;