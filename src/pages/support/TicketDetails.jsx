// src\pages\support\TicketDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { get, post } = useApi();

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const data = await get(`/support/tickets/${id}`);
      setTicket(data);
    } catch (error) {
      console.error('Failed to fetch ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    setSubmitting(true);
    try {
      await post(`/support/tickets/${id}/reply`, { message: reply });
      setReply('');
      fetchTicket();
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-blue-100 text-blue-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ticket not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Ticket #{ticket.ticketId}</h2>
              <p className="text-blue-100 mt-1">{ticket.subject}</p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                {ticket.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Ticket Messages */}
          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {ticket.userName?.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800">{ticket.userName}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{ticket.message}</p>
            </div>

            {ticket.replies?.map((reply, index) => (
              <div key={index} className={`rounded-lg p-6 ${reply.isAdmin ? 'bg-blue-50 ml-8' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${reply.isAdmin ? 'bg-green-600' : 'bg-gray-600'}`}>
                      {reply.isAdmin ? 'S' : 'U'}
                    </div>
                    <span className="font-medium text-gray-800">
                      {reply.isAdmin ? 'Support Team' : ticket.userName}
                    </span>
                    {reply.isAdmin && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">Staff</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{reply.message}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Reply</h3>
              <textarea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => navigate('/support')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <Button onClick={handleReply} loading={submitting} disabled={!reply.trim()}>
                  Send Reply
                </Button>
              </div>
            </div>
          )}

          {/* Ticket Closed Message */}
          {(ticket.status === 'closed' || ticket.status === 'resolved') && (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-600">This ticket is {ticket.status}. It cannot be replied to.</p>
              <button
                onClick={() => navigate('/support')}
                className="mt-3 text-blue-600 hover:text-blue-700"
              >
                Back to Support
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;