// src\pages\offers\Offers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { get } = useApi();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const data = await get('/user/offers');
      setOffers(Array.isArray(data) ? data : (data?.offers || []));
    }
    catch (error) {
      console.error('Failed to fetch offers:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const getOfferIcon = (type) => {
    const icons = {
      discount: '🏷️',
      cashback: '💰',
      interest: '📉',
      processing_fee: '📄',
      referral: '🎁',
      festival: '🎉'
    };
    return icons[type] || '🎯';
  };

  const getOfferGradient = (type) => {
    const gradients = {
      discount: 'from-amber-400 to-orange-500',
      cashback: 'from-emerald-400 to-teal-500',
      interest: 'from-sky-400 to-blue-500',
      processing_fee: 'from-purple-400 to-violet-500',
      referral: 'from-rose-400 to-pink-500',
      festival: 'from-fuchsia-400 to-purple-500'
    };
    return gradients[type] || 'from-gray-400 to-gray-500';
  };

  const getBadgeColor = (type) => {
    const colors = {
      discount: 'bg-amber-100 text-amber-700',
      cashback: 'bg-emerald-100 text-emerald-700',
      interest: 'bg-sky-100 text-sky-700',
      processing_fee: 'bg-purple-100 text-purple-700',
      referral: 'bg-rose-100 text-rose-700',
      festival: 'bg-fuchsia-100 text-fuchsia-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return offer.isActive;
    if (activeTab === 'expired') return !offer.isActive && new Date(offer.endDate) < new Date();
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-12 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full transform -translate-x-6 translate-y-6"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🎉</span>
              <h2 className="text-3xl font-bold text-white">Exclusive Offers</h2>
            </div>
            <p className="text-purple-100 text-lg">Unlock amazing deals and save big on your loans</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                🏷️ Limited Time
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                ⚡ Flash Deals
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                🎁 Special Offers
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex gap-2 p-1 bg-gray-100/50 rounded-xl">
            {['all', 'active', 'expired'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {tab === 'all' && '📋 All Offers'}
                {tab === 'active' && '✨ Active'}
                {tab === 'expired' && '⏰ Expired'}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center">
            <div className="text-7xl mb-6 animate-bounce">🎁</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Offers Available</h3>
            <p className="text-gray-500">Check back soon for exciting deals and promotions!</p>
            <div className="mt-6 flex justify-center gap-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm">📅 Coming Soon</span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm">🔥 Stay Tuned</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer, index) => (
              <div 
                key={offer.id} 
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  offer.isActive 
                    ? 'hover:shadow-2xl hover:-translate-y-2' 
                    : 'opacity-60 grayscale'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getOfferGradient(offer.type)} opacity-90`}></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-8 translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Content */}
                <div className="relative p-6 text-white">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {getOfferIcon(offer.type)}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getBadgeColor(offer.type)}`}>
                        {(offer.type || 'offer').replace('_', ' ')}
                      </span>
                    </div>
                    {offer.discount && (
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                        <span className="text-2xl font-black">{offer.discount}%</span>
                        <span className="text-xs block opacity-80">OFF</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">{offer.description}</p>

                  {/* Details */}
                  <div className="space-y-2 text-sm bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/80">📅 Valid Till</span>
                      <span className="font-semibold">{offer.endDate ? new Date(offer.endDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      }) : 'N/A'}</span>
                    </div>
                    {offer.minLoanAmount && (
                      <div className="flex justify-between">
                        <span className="text-white/80">💰 Min. Loan</span>
                        <span className="font-semibold">₹{offer.minLoanAmount.toLocaleString()}</span>
                      </div>
                    )}
                    {offer.code && (
                      <div className="mt-2">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center border border-white/20">
                          <span className="text-xs text-white/80">Use Code</span>
                          <code className="block font-mono font-bold text-lg tracking-wider">{offer.code}</code>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  {offer.isActive ? (
                    <Link 
                      to={offer.ctaLink || '/apply-loan'} 
                      className="block text-center px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {offer.ctaText || '🚀 Apply Now'}
                    </Link>
                  ) : (
                    <div className="text-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <span className="text-white/80 font-medium">⏰ Offer Expired</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 inline-block">
            🎯 Terms and conditions apply. Offers are subject to change without prior notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offers;