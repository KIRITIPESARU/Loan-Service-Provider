import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;