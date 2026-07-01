// src\pages\profile\BankAccounts.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankName: '',
    accountType: 'savings'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { get, post, put } = useApi();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await get('/user/bank-accounts');
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch bank accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (formData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await post('/user/bank-accounts', formData);
      setShowAddForm(false);
      setFormData({
        accountHolderName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        bankName: '',
        accountType: 'savings'
      });
      fetchAccounts();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to add bank account' });
    } finally {
      setSubmitting(false);
    }
  };

  const setDefaultAccount = async (accountId) => {
    try {
      await put(`/user/bank-accounts/${accountId}/default`);
      fetchAccounts();
    } catch (error) {
      console.error('Failed to set default account:', error);
    }
  };

  const deleteAccount = async (accountId) => {
    if (window.confirm('Are you sure you want to remove this bank account?')) {
      try {
        await post(`/user/bank-accounts/${accountId}/delete`);
        fetchAccounts();
      } catch (error) {
        console.error('Failed to delete bank account:', error);
      }
    }
  };

  const maskAccountNumber = (number) => {
    return 'XXXX' + number.slice(-4);
  };

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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Bank Accounts</h2>
              <p className="text-blue-100 mt-1">Manage your linked bank accounts</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50"
            >
              + Add Account
            </button>
          </div>
        </div>

        <div className="p-8">
          {accounts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏦</div>
              <p className="text-gray-500">No bank accounts linked</p>
              <p className="text-sm text-gray-400 mt-2">Add a bank account to receive loan disbursements</p>
            </div>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className={`border rounded-lg p-4 ${account.isDefault ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{account.bankName}</h3>
                        {account.isDefault && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Default</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Account Holder: {account.accountHolderName}</p>
                      <p className="text-sm text-gray-600">Account Number: {maskAccountNumber(account.accountNumber)}</p>
                      <p className="text-sm text-gray-600">IFSC: {account.ifscCode}</p>
                      <p className="text-sm text-gray-600 capitalize">Type: {account.accountType}</p>
                    </div>
                    <div className="flex gap-2">
                      {!account.isDefault && (
                        <button
                          onClick={() => setDefaultAccount(account.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteAccount(account.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center sticky top-0">
              <h3 className="text-xl font-bold text-white">Add Bank Account</h3>
              <button onClick={() => setShowAddForm(false)} className="text-white hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errors.submit && (
                <div className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errors.submit}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.accountHolderName && <p className="text-xs text-red-500 mt-1">{errors.accountHolderName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Account Number</label>
                <input
                  type="text"
                  value={formData.confirmAccountNumber}
                  onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.confirmAccountNumber && <p className="text-xs text-red-500 mt-1">{errors.confirmAccountNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                  placeholder="SBIN0001234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 uppercase"
                  required
                />
                {errors.ifscCode && <p className="text-xs text-red-500 mt-1">{errors.ifscCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="salary">Salary Account</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" loading={submitting} className="flex-1">
                  Add Account
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
                ⚠️ Please ensure the account details are correct. Loan disbursements will be sent to this account.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccounts;