import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Download } from 'lucide-react';

const data = [
  { name: 'Mon', calories: 2400, steps: 8000, amt: 2400 },
  { name: 'Tue', calories: 1398, steps: 12000, amt: 2210 },
  { name: 'Wed', calories: 9800, steps: 5000, amt: 2290 },
  { name: 'Thu', calories: 3908, steps: 9000, amt: 2000 },
  { name: 'Fri', calories: 4800, steps: 11000, amt: 2181 },
  { name: 'Sat', calories: 3800, steps: 15000, amt: 2500 },
  { name: 'Sun', calories: 4300, steps: 7000, amt: 2100 },
];

const weightData = [
    { name: 'Week 1', weight: 72 },
    { name: 'Week 2', weight: 71.5 },
    { name: 'Week 3', weight: 71.2 },
    { name: 'Week 4', weight: 70.8 },
    { name: 'Week 5', weight: 70.0 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
        <button className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <Download className="h-4 w-4" />
            Export Data
        </button>
      </div>

      {/* Activity Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <Tooltip 
                cursor={{fill: '#F3F4F6'}} 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
              />
              <Bar dataKey="steps" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weight Trend</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weightData}>
                         <defs>
                            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                        <Area type="monotone" dataKey="weight" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Calorie Burn */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Calories Burned</h3>
            <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                        <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff'}} />
                    </LineChart>
                 </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
