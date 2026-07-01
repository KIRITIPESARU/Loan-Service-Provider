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
      setOffers(data);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
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

  const getOfferColor = (type) => {
    const colors = {
      discount: 'from-red-500 to-pink-500',
      cashback: 'from-green-500 to-emerald-500',
      interest: 'from-blue-500 to-indigo-500',
      processing_fee: 'from-purple-500 to-violet-500',
      referral: 'from-orange-500 to-yellow-500',
      festival: 'from-pink-500 to-rose-500'
    };
    return colors[type] || 'from-gray-500 to-gray-600';
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Offers & Promotions</h2>
          <p className="text-blue-100 mt-1">Exclusive deals and discounts for you</p>
        </div>

        <div className="border-b border-gray-200 px-8">
          <div className="flex gap-6">
            {['all', 'active', 'expired'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <p className="text-gray-500">No offers available at the moment</p>
              <p className="text-sm text-gray-400 mt-2">Check back soon for exciting offers!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div key={offer.id} className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${offer.isActive ? '' : 'opacity-60'}`}>
                  <div className={`bg-gradient-to-r ${getOfferColor(offer.type)} p-4 text-white`}>
                    <div className="flex justify-between items-start">
                      <span className="text-3xl">{getOfferIcon(offer.type)}</span>
                      {offer.discount && (
                        <span className="text-2xl font-bold">{offer.discount}% OFF</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mt-2">{offer.title}</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Valid Till:</span>
                        <span className="font-medium">{new Date(offer.endDate).toLocaleDateString()}</span>
                      </div>
                      {offer.minLoanAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Min. Loan Amount:</span>
                          <span className="font-medium">₹{offer.minLoanAmount.toLocaleString()}</span>
                        </div>
                      )}
                      {offer.code && (
                        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-center">
                          <code className="font-mono font-bold text-blue-600">{offer.code}</code>
                        </div>
                      )}
                    </div>
                    {offer.isActive && (
                      <Link
                        to={offer.ctaLink || '/apply-loan'}
                        className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        {offer.ctaText || 'Apply Now'}
                      </Link>
                    )}
                    {!offer.isActive && (
                      <div className="mt-4 text-center text-gray-400 text-sm">
                        Offer Expired
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;