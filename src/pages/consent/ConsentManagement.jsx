// src\pages\consent\ConsentManagement.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';

const ConsentManagement = () => {
  const [consents, setConsents] = useState({
    dataSharing: false,
    creditBureauAccess: false,
    marketingEmails: false,
    smsNotifications: true,
    emailNotifications: true,
    termsAccepted: false,
    privacyPolicyAccepted: false
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { get, post } = useApi();

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const data = await get('/user/consents');
      setConsents(data);
    } catch (error) {
      console.error('Failed to fetch consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsentChange = (key) => {
    setConsents({ ...consents, [key]: !consents[key] });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await post('/user/consents', consents);
      alert('Consent preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save consents:', error);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const consentItems = [
    {
      key: 'dataSharing',
      title: 'Data Sharing with Lenders',
      description: 'Allow sharing of your financial data with partner lenders for better loan offers'
    },
    {
      key: 'creditBureauAccess',
      title: 'Credit Bureau Access',
      description: 'Authorize us to check your credit score from authorized credit bureaus'
    },
    {
      key: 'marketingEmails',
      title: 'Marketing Emails',
      description: 'Receive promotional offers and new loan product updates via email'
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      description: 'Get important loan updates and payment reminders via SMS'
    },
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive loan statements, payment confirmations and updates via email'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Consent Management</h2>
          <p className="text-blue-100 mt-1">
            Manage your data sharing and notification preferences
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {consentItems.map((item) => (
              <div key={item.key} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents[item.key]}
                    onChange={() => handleConsentChange(item.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Legal Agreements</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Terms of Service</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Read and accept our terms of service for using the platform
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      View Document
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.termsAccepted}
                        onChange={() => handleConsentChange('termsAccepted')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Privacy Policy</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Understand how we collect, use, and protect your data
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      View Document
                    </button>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.privacyPolicyAccepted}
                        onChange={() => handleConsentChange('privacyPolicyAccepted')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-900">Your Privacy Matters</p>
                  <p className="text-xs text-blue-800 mt-1">
                    You can change these preferences at any time. Some consents are required for loan processing.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} loading={saving} className="w-full">
              Save Consent Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentManagement;