// src\components\common\PaymentGateway.jsx
import React, { useState } from 'react';
import Button from './Button';

const PaymentGateway = ({ amount, onPayment, loading }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment({ method: paymentMethod, details: cardDetails });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`flex-1 p-4 border-2 rounded-lg text-center ${
            paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="text-2xl mb-1">💳</div>
          <div className="text-sm font-medium">Credit/Debit Card</div>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={`flex-1 p-4 border-2 rounded-lg text-center ${
            paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="text-2xl mb-1">📱</div>
          <div className="text-sm font-medium">UPI</div>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('netbanking')}
          className={`flex-1 p-4 border-2 rounded-lg text-center ${
            paymentMethod === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
        >
          <div className="text-2xl mb-1">🏦</div>
          <div className="text-sm font-medium">Net Banking</div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </>
        )}

        {paymentMethod === 'upi' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
            <input
              type="text"
              placeholder="username@bankname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        )}

        {paymentMethod === 'netbanking' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
              <option value="">Select your bank</option>
              <option>SBI</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
            </select>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Amount to Pay:</span>
            <span className="text-xl font-bold text-blue-600">₹{amount.toLocaleString()}</span>
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Pay Now
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span>🔒 Secure Payment</span>
        <span>✓ PCI Compliant</span>
        <span>✓ 128-bit SSL</span>
      </div>
    </div>
  );
};

export default PaymentGateway;