// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
  const [role, setRole] = useState('client');
  const [formData, setFormData] = useState({
    email: 'candidate@example.com',
    password: 'password123',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setFormData(prev => ({ ...prev, email: 'admin@homeloan.com', password: 'adminpassword' }));
    } else {
      setFormData(prev => ({ ...prev, email: 'candidate@example.com', password: 'password123' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const authenticatedUser = await login(formData);
      if (authenticatedUser.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    }
    catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#333333]">Welcome Back</h2>
          <p className="text-[#666666] mt-2">Sign in to your account</p>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm font-medium text-red-700">{errorMsg}</p>
          </div>
        )}

        {/* Role Dropdown Select */}
        <div className="mb-6">
          <label htmlFor="roleSelect" className="block text-sm font-semibold text-[#333333] mb-2">
            Select Role / Login As
          </label>
          <div className="relative">
            <select
              id="roleSelect"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-[#1ca1de] focus:border-transparent block p-3.5 pr-10 transition-all cursor-pointer shadow-sm hover:bg-gray-100/70"
            >
              <option value="client">👤 Client</option>
              <option value="admin">🛡️ Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address" type="email" value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            placeholder="john@example.com" required 
          />
          <Input 
            label="Password" type="password" value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            placeholder="••••••••" required 
          />
          
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={formData.rememberMe} onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} className="rounded border-gray-300 text-[#1ca1de] focus:ring-[#1ca1de]" />
              <span className="ml-2 text-sm text-[#666666] font-medium">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-bold text-[#1ca1de] hover:text-[#158bbb]">Forgot password?</Link>
          </div>
          
          <Button type="submit" loading={loading} className="w-full mt-2">
            Secure Login
          </Button>
        </form>
        
        <p className="text-center text-[#666666] mt-6 font-medium text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#1ca1de] hover:text-[#158bbb] font-bold">Sign up</Link>
        </p>

        {/* Demo Credentials Hint */}
        <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs font-bold text-[#1ca1de] uppercase tracking-wider mb-2">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-[#666666]">
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <p className="font-semibold text-gray-800 flex items-center gap-1 mb-1 text-xs">👤 Client</p>
              <p className="text-xs text-gray-600">User: <span className="font-mono text-gray-800 text-[11px]">candidate@example.com</span></p>
              <p className="text-xs text-gray-600">Pass: <span className="font-mono text-gray-800 text-[11px]">password123</span></p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-xs">
              <p className="font-semibold text-gray-800 flex items-center gap-1 mb-1 text-xs">🛡️ Admin</p>
              <p className="text-xs text-gray-600">User: <span className="font-mono text-gray-800 text-[11px]">admin@homeloan.com</span></p>
              <p className="text-xs text-gray-600">Pass: <span className="font-mono text-gray-800 text-[11px]">adminpassword</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;