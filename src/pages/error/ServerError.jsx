// src\pages\error\ServerError.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-8xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Server Error</h1>
        <p className="text-gray-600 mb-4">
          Something went wrong on our end. Please try again later.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
          <Link
            to="/dashboard"
            className="inline-block w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;