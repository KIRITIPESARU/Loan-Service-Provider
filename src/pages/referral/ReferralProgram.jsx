// src\pages\referral\ReferralProgram.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';

const ReferralProgram = () => {
  const [referralData, setReferralData] = useState({
    code: '',
    earnings: 0,
    referrals: [],
    totalReferrals: 0,
    activeReferrals: 0
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { get, post } = useApi();

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const data = await get('/user/referral');
      setReferralData(data);
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${referralData.code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOnWhatsApp = () => {
    const text = `Join LSP Platform using my referral code ${referralData.code} and get exclusive benefits!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `Join LSP Platform using my referral code ${referralData.code} and get exclusive benefits!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h1 className="text-3xl font-bold mb-2">Refer & Earn</h1>
        <p className="text-purple-100 mb-6">
          Invite your friends and earn rewards for every successful loan
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={copyReferralLink}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50"
          >
            {copied ? 'Copied! ✓' : 'Copy Referral Link'}
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Share on WhatsApp
          </button>
          <button
            onClick={shareOnTwitter}
            className="px-6 py-3 bg-blue-400 text-white rounded-lg font-semibold hover:bg-blue-500"
          >
            Share on Twitter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-gray-800">Your Referral Code</h3>
              <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                <code className="text-2xl font-mono font-bold text-purple-600">{referralData.code}</code>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Total Earnings</span>
                <span className="text-2xl font-bold text-green-600">₹{referralData.earnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Total Referrals</span>
                <span className="text-2xl font-bold text-blue-600">{referralData.totalReferrals}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Active Referrals</span>
                <span className="text-2xl font-bold text-purple-600">{referralData.activeReferrals}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Referrals</h3>
            {referralData.referrals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-500">No referrals yet</p>
                <p className="text-sm text-gray-400 mt-2">Share your referral link to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {referralData.referrals.map((referral, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {referral.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{referral.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{new Date(referral.joinedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+₹{referral.earnings.toLocaleString()}</p>
                      <p className={`text-xs ${referral.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
                        {referral.status === 'active' ? '✓ Active' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Referral Benefits */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Referral Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-semibold text-gray-800">₹500 per referral</p>
                <p className="text-xs text-gray-500">When they get loan approved</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-2">💰</div>
                <p className="font-semibold text-gray-800">1% of loan amount</p>
                <p className="text-xs text-gray-500">For every successful loan</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-2">🏅</div>
                <p className="font-semibold text-gray-800">Bonus Rewards</p>
                <p className="text-xs text-gray-500">Top referrers get extra cashback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;