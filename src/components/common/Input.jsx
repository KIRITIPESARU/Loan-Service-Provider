// src/components/common/Input.jsx
import React from 'react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 ${
          error
            ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-300'
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1.5 font-medium animate-slideDown">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default Input;
