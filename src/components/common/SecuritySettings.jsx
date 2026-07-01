// src/components/common/SecuritySettings.jsx
import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Input from './Input';
import Button from './Button';

const SecuritySettings = () => {
  const { post, loading } = useApi();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [twoFA, setTwoFA] = useState({
    enabled: false,
    phone: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }
    try {
      await post('/user/change-password', passwords);
      alert('Password updated successfully!');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handle2FAToggle = async (e) => {
    e.preventDefault();
    try {
      await post('/user/enable-2fa', { phone: twoFA.phone });
      setTwoFA(prev => ({ ...prev, enabled: !prev.enabled }));
      alert(`Two-Factor Authentication ${!twoFA.enabled ? 'Enabled' : 'Disabled'} successfully!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            required
          />
          <Button type="submit" loading={loading}>Update Password</Button>
        </form>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-gray-600 mb-4">Secure your account with an OTP sent to your mobile phone number.</p>
        <form onSubmit={handle2FAToggle} className="max-w-md space-y-4">
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${twoFA.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              Status: {twoFA.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          {!twoFA.enabled && (
            <Input
              label="Phone Number for OTP"
              type="tel"
              value={twoFA.phone}
              onChange={(e) => setTwoFA({ ...twoFA, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              required
            />
          )}
          <Button type="submit">
            {twoFA.enabled ? 'Disable 2FA' : 'Enable 2FA'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SecuritySettings;
