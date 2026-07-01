// src/components/common/PreferenceSettings.jsx
import React, { useState } from 'react';
import Button from './Button';

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'English',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR (₹)'
  });

  const handleSave = () => {
    alert('User preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Preference Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Display Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">☀️ Light Theme (Default)</option>
            <option value="dark">🌙 Dark Theme (Sleek)</option>
            <option value="glass">💎 Glassmorphism Mode</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Default Language</label>
          <select
            value={preferences.language}
            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Tamil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
          <select
            value={preferences.timezone}
            onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>IST (UTC+5:30)</option>
            <option>EST (UTC-5:00)</option>
            <option>GMT (UTC+0:00)</option>
            <option>SGT (UTC+8:00)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Currency Format</label>
          <select
            value={preferences.currency}
            onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>INR (₹)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-6">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferenceSettings;
