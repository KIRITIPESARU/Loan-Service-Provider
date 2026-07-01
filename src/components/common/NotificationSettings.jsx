// src/components/common/NotificationSettings.jsx
import React, { useState } from 'react';
import Button from './Button';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailEMI: true,
    emailOffers: false,
    smsEMI: true,
    smsOffers: false,
    pushEMI: true,
    pushActivity: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert('Notification preferences updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email Notifications</h4>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">EMI & Repayment Reminders</p>
              <p className="text-xs text-gray-500 font-normal">Receive invoices and alerts before due dates.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailEMI}
              onChange={() => handleToggle('emailEMI')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Promotions & Pre-approved Offers</p>
              <p className="text-xs text-gray-500 font-normal">Receive updates about exclusive lending rates.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailOffers}
              onChange={() => handleToggle('emailOffers')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">SMS Alerts</h4>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Critical EMI Reminders</p>
              <p className="text-xs text-gray-500 font-normal">High-priority SMS alerts for outstanding amounts.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.smsEMI}
              onChange={() => handleToggle('smsEMI')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Lender Offer Notifications</p>
              <p className="text-xs text-gray-500 font-normal">Receive short messages on latest matches.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.smsOffers}
              onChange={() => handleToggle('smsOffers')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Mobile Push Notifications</h4>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Real-Time Loan Tracking</p>
              <p className="text-xs text-gray-500 font-normal">Receive alerts as your application moves through approvals.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.pushEMI}
              onChange={() => handleToggle('pushEMI')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">Account Security Activity</p>
              <p className="text-xs text-gray-500 font-normal">Push notification for logins from new devices.</p>
            </div>
            <input
              type="checkbox"
              checked={settings.pushActivity}
              onChange={() => handleToggle('pushActivity')}
              className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
