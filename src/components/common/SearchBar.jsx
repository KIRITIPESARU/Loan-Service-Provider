// src/components/common/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 text-white placeholder-blue-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 transition-all"
      />
    </div>
  );
};

export default SearchBar;
