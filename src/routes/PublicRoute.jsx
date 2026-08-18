// src\routes\PublicRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Outlet />;
  return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
};

export default PublicRoute;