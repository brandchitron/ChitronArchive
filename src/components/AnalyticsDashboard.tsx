import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Mon', visitors: 400, views: 2400 },
  { name: 'Tue', visitors: 300, views: 1398 },
  { name: 'Wed', visitors: 200, views: 9800 },
  { name: 'Thu', visitors: 278, views: 3908 },
  { name: 'Fri', visitors: 189, views: 4800 },
  { name: 'Sat', visitors: 239, views: 3800 },
  { name: 'Sun', visitors: 349, views: 4300 },
];

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
];

const COLORS = ['#7B2FF7', '#9D4EDD', '#C77DFF'];

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-card border border-white/10 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-heading text-text mb-4">Traffic Trends</h3>
        <div className="h-64 relative">
          {isLoading ? (
            <div className="w-full h-full bg-panel rounded-xl animate-shimmer" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#B8B8B8" />
                <YAxis stroke="#B8B8B8" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', color: '#F8F8F8' }} />
                <Line type="monotone" dataKey="views" stroke="#7B2FF7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      
      <div className="bg-card border border-white/10 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-heading text-text mb-4">Traffic Sources</h3>
        <div className="h-64 relative">
          {isLoading ? (
            <div className="w-full h-full bg-panel rounded-full animate-shimmer" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {trafficData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: 'none', color: '#F8F8F8' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
