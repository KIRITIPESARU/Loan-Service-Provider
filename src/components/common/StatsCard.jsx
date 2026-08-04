// src/components/common/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, trend, subtitle, gradient = "from-blue-50 to-blue-100" }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 card-hover transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#666666] text-sm font-bold uppercase tracking-wider">{title}</p>
          <p className="text-3xl md:text-3xl font-bold text-[#333333] mt-2 tracking-tight">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gradient}`}>{icon}</div>
      </div>
      {(trend || subtitle) && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium">
          {trend && (<span className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
            <i className={`fas fa-arrow-${trend.isPositive ? 'up' : 'down'}`}></i> {trend.value}
          </span>)}
          {subtitle && (<span className="text-slate-500">{subtitle}</span>)}
        </div>
      )}
    </div>
  );
};

export default StatsCard;