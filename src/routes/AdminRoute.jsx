// src\routes\AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../components/layout/AdminLayout';

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;