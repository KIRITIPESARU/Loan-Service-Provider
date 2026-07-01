import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CreditScore = () => {
  const [creditData, setCreditData] = useState({
    score: 0,
    rating: '',
    factors: [],
    history: []
  });
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchCreditScore();
  }, []);

  const fetchCreditScore = async () => {
    try {
      const data = await get('/user/credit-score');
      setCreditData(data);
    } catch (error) {
      console.error('Failed to fetch credit score:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-amber-500';
    if (score >= 550) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRatingText = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  const getProgressColor = (score) => {
    if (score >= 750) return '#16a34a'; // green-600
    if (score >= 650) return '#f59e0b'; // amber-500
    if (score >= 550) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credit Score Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center h-full flex flex-col justify-center relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-8 relative z-10">Your Credit Score</h3>
            
            <div className="relative inline-block mx-auto">
              <svg className="w-56 h-56 mx-auto drop-shadow-md">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getProgressColor(creditData.score)} />
                    <stop offset="100%" stopColor={getProgressColor(creditData.score)} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <circle
                  className="text-slate-100"
                  strokeWidth="16"
                  stroke="currentColor"
                  fill="transparent"
                  r="100"
                  cx="112"
                  cy="112"
                />
                <circle
                  strokeWidth="16"
                  strokeDasharray={`${(creditData.score / 900) * 628} 628`}
                  strokeLinecap="round"
                  stroke="url(#scoreGradient)"
                  fill="transparent"
                  r="100"
                  cx="112"
                  cy="112"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className={`text-5xl font-extrabold tracking-tight ${getRatingColor(creditData.score)}`}>
                  {creditData.score}
                </div>
                <div className="text-sm font-medium text-gray-400 mt-1 uppercase tracking-widest">out of 900</div>
              </div>
            </div>
            
            <div className="mt-8 relative z-10">
              <div className={`inline-block px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-lg font-bold ${getRatingColor(creditData.score)}`}>
                {getRatingText(creditData.score)}
              </div>
              <p className="text-sm font-medium text-gray-500 mt-4 leading-relaxed max-w-[200px] mx-auto">
                {creditData.score >= 750 
                  ? "Excellent! You qualify for the best interest rates." 
                  : creditData.score >= 650 
                  ? "Good score. You're eligible for most loan products."
                  : creditData.score >= 550
                  ? "Fair score. Consider improving before applying for large loans."
                  : "Poor score. Work on improving your credit history."}
              </p>
            </div>
          </div>
        </div>

        {/* Score Factors */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
              Key Factors Impacting Score
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {creditData.factors.map((factor, index) => (
                <div key={index} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{factor.name}</span>
                    <span className={`text-sm font-bold ${factor.impact === 'positive' ? 'text-green-600' : 'text-amber-600'}`}>
                      {factor.value}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-1000 ${factor.impact === 'positive' ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${factor.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs font-medium text-gray-500">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score History Chart */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
              Score History
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={creditData.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    domain={[300, 900]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={4}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScore;