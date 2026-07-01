// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout as authLogout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple success mock
        if (credentials.email && credentials.password) {
          const mockUser = {
            email: credentials.email,
            fullName: credentials.email.split('@')[0].toUpperCase(),
            role: credentials.email.includes('admin') ? 'admin' : 'user'
          };
          dispatch(loginSuccess(mockUser));
          resolve(mockUser);
        } else {
          dispatch(loginFailure('Invalid credentials'));
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const register = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, email: userData.email });
      }, 800);
    });
  };

  const logout = async () => {
    dispatch(authLogout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };
};
