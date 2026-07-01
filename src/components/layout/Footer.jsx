// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
      <p>© {new Date().getFullYear()} LSP Platform. All rights reserved. Partnered with RBI-regulated NBFCs & Banks.</p>
      <div className="flex gap-4">
        <a href="/terms" className="hover:text-blue-600 transition">Terms of Service</a>
        <a href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</a>
        <a href="/support" className="hover:text-blue-600 transition">Support Center</a>
      </div>
    </footer>
  );
};

export default Footer;
