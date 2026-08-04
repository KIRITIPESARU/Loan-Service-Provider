// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
  const [role, setRole] = useState('candidate');
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

        {/* Role Toggle Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            type="button" 
            onClick={() => handleRoleChange('candidate')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${role === 'candidate' ? 'bg-white shadow-sm text-[#1ca1de]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            👤 Candidate
          </button>
          <button 
            type="button" 
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${role === 'admin' ? 'bg-white shadow-sm text-[#1ca1de]' : 'text-gray-500 hover:text-gray-700'}`}
          >
            🛡️ Admin
          </button>
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
            <label className="flex items-center">
              <input type="checkbox" checked={formData.rememberMe} onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} className="rounded border-gray-300 text-[#1ca1de] focus:ring-[#1ca1de]" />
              <span className="ml-2 text-sm text-[#666666] font-medium">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-bold text-[#1ca1de] hover:text-[#158bbb]">Forgot password?</Link>
          </div>
          
          <Button type="submit" loading={loading} className="w-full mt-2">
            Secure Login
          </Button>
        </form>
        
        <p className="text-center text-[#666666] mt-6 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#1ca1de] hover:text-[#158bbb] font-bold">Sign up</Link>
        </p>

        {/* Demo Credentials Hint */}
        <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-lg p-4">
          <p className="text-xs font-bold text-[#1ca1de] uppercase tracking-wider mb-2">Demo Credentials</p>
          <div className="flex gap-4 text-sm text-[#666666]">
            <div>
              <p className="font-semibold text-gray-800 flex items-center gap-1">👤 Candidate</p>
              <p>User: candidate@example.com</p>
              <p>Pass: password123</p>
            </div>
            <div className="border-l border-blue-200 pl-4">
              <p className="font-semibold text-gray-800 flex items-center gap-1">🛡️ Admin</p>
              <p>User: admin@homeloan.com</p>
              <p>Pass: adminpassword</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;