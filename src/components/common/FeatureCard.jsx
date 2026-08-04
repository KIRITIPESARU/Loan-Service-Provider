// src/components/common/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, iconBg = "bg-indigo-50" }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm card-hover transition-all">
      <div className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center mb-5`}>{icon}</div>
      <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
      <p className="text-[#666666] mt-2 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;