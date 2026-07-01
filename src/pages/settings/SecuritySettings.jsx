// src\pages\settings\SecuritySettings.jsx
import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const SecuritySettings = () => {
  const [activeSession, setActiveSession] = useState('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFA, setTwoFA] = useState({
    enabled: false,
    phone: '',
    verified: false
  });
  const [sessions, setSessions] = useState([
    { device: 'Chrome on Windows', location: 'Mumbai, India', lastActive: 'Now', current: true },
    { device: 'Safari on iPhone', location: 'Mumbai, India', lastActive: '2 hours ago', current: false },
    { device: 'Firefox on Mac', location: 'Delhi, India', lastActive: 'Yesterday', current: false }
  ]);
  const { post } = useApi();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await post('/user/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setMessage('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const enableTwoFA = async () => {
    setLoading(true);
    try {
      await post('/user/enable-2fa', { phone: twoFA.phone });
      setTwoFA({ ...twoFA, verified: true, enabled: true });
      setMessage('Two-factor authentication enabled successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to enable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = (index) => {
    const newSessions = sessions.filter((_, i) => i !== index);
    setSessions(newSessions);
    setMessage('Session revoked successfully');
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
          <Input
            type="password"
            label="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          <Input
            type="password"
            label="New Password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          <Input
            type="password"
            label="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
          />
          <Button type="submit" loading={loading}>Update Password</Button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
        {!twoFA.enabled ? (
          <div className="space-y-4 max-w-md">
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Input
              type="tel"
              label="Phone Number"
              value={twoFA.phone}
              onChange={(e) => setTwoFA({ ...twoFA, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
            <Button onClick={enableTwoFA} loading={loading}>Enable 2FA</Button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="font-medium text-green-800">Two-Factor Authentication Enabled</p>
                <p className="text-sm text-green-700">Phone: {twoFA.phone}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Sessions</h3>
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{session.device}</p>
                  <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => revokeSession(index)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Revoke
                </button>
              )}
              {session.current && (
                <span className="text-xs text-green-600">Current Session</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;