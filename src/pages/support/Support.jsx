// src\pages\support\Support.jsx
import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Support = () => {
  const [ticket, setTicket] = useState({
    subject: '',
    category: 'technical',
    message: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { post } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await post('/support/tickets', ticket);
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How long does loan approval take?",
      answer: "Most loans are approved within 24-48 hours after KYC verification."
    },
    {
      question: "What documents are required?",
      answer: "PAN card, Aadhaar card, bank statements, and income proof."
    },
    {
      question: "Can I prepay my loan?",
      answer: "Yes, you can prepay your loan with zero penalty after 6 months."
    },
    {
      question: "How to check repayment schedule?",
      answer: "Go to Loans section and click on 'View Details' for your active loan."
    }
  ];

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Ticket Created Successfully</h3>
          <p className="text-gray-600 mb-6">
            Our support team will respond to your query within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Contact Support</h2>
              <p className="text-blue-100 mt-1">
                We're here to help. Fill out the form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="technical">Technical Issue</option>
                  <option value="loan">Loan Related</option>
                  <option value="payment">Payment Issue</option>
                  <option value="kyc">KYC Verification</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={ticket.priority}
                  onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={ticket.message}
                  onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                  placeholder="Please provide detailed information about your issue..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Submit Ticket
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="font-medium text-gray-700 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-gray-600 text-sm mt-2 pl-0">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-6 text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <h4 className="text-lg font-bold mb-2">Need Immediate Help?</h4>
            <p className="text-blue-100 mb-4">Call our 24/7 support line</p>
            <p className="text-2xl font-bold">+91 1800 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;