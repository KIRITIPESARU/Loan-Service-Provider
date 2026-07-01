// src/components/common/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, iconBg = "bg-indigo-50" }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover transition-all">
      <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-2 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;