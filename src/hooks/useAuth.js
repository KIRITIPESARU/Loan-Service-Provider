// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout as authLogout } from '../store/slices/authSlice';

// Helper to manage our mock DB in localStorage
const getMockUsers = () => {
  const users = localStorage.getItem('mockUsers');
  if (users) return JSON.parse(users);
  
  // Default mock users
  const defaults = [
    { email: 'candidate@example.com', password: 'password123', role: 'user', fullName: 'Test Candidate' },
    { email: 'admin@homeloan.com', password: 'adminpassword', role: 'admin', fullName: 'Admin User' }
  ];
  localStorage.setItem('mockUsers', JSON.stringify(defaults));
  return defaults;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getMockUsers();
        const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (foundUser) {
          const userPayload = { ...foundUser };
          delete userPayload.password; // Don't store password in redux state
          dispatch(loginSuccess(userPayload));
          resolve(userPayload);
        } else {
          dispatch(loginFailure('Invalid email or password'));
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getMockUsers();
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('Email already exists. Please log in.'));
          return;
        }

        const newUser = {
          email: userData.email,
          password: userData.password,
          fullName: userData.fullName,
          role: 'user', // newly registered users are always standard 'user'
          phone: userData.phone
        };
        
        users.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(users));
        
        resolve({ success: true, email: userData.email });
      }, 500);
    });
  };

  const logout = async () => { dispatch(authLogout()); };
  
  return { user, isAuthenticated, loading, error, login, register, logout };
};