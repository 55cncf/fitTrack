import React, { useState } from 'react';
import { Bell, Clock, Calendar, Trophy, Zap, AlertCircle } from 'lucide-react';
import { NotificationSetting } from '../types';
import { DEFAULT_NOTIFICATIONS } from '../constants';

const Notifications: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>(DEFAULT_NOTIFICATIONS);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const getIcon = (type: string) => {
    switch (type) {
        case 'reminder': return <Zap className="h-5 w-5 text-blue-500" />;
        case 'goal': return <Trophy className="h-5 w-5 text-green-500" />;
        case 'report': return <Calendar className="h-5 w-5 text-purple-500" />;
        case 'badge': return <Trophy className="h-5 w-5 text-orange-500" />; // Fallback icon
        case 'social': return <Zap className="h-5 w-5 text-red-500" />;
        default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-6 rounded-2xl text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
            <Bell className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <p className="text-pink-100">Manage your alerts and reminders</p>
      </div>

      {/* Toggles List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Notification Types</h3>
        <div className="space-y-6">
            {settings.map(setting => (
                <div key={setting.id} className="flex items-start justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex gap-4">
                        <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            {getIcon(setting.type)}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{setting.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => toggleSetting(setting.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${setting.enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Timing Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-primary-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notification Timing</h3>
        </div>
        
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Workout Reminder Time</label>
                <div className="relative">
                    <input type="time" defaultValue="07:00" className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <p className="mt-1 text-xs text-gray-500">Set your preferred time for daily workout reminders</p>
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reminder Frequency</label>
                 <select className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                    <option>Daily</option>
                    <option>Weekdays only</option>
                    <option>Weekends only</option>
                 </select>
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weekly Report Day</label>
                 <select className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary-500 focus:border-primary-500">
                    <option>Monday</option>
                    <option>Sunday</option>
                    <option>Friday</option>
                 </select>
                 <p className="mt-1 text-xs text-gray-500">Choose which day to receive your weekly summary</p>
            </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quiet Hours</h3>
        <p className="text-sm text-gray-500 mb-4">Pause notifications during these hours</p>
        
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Start Time</label>
                <input type="time" defaultValue="22:00" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
             </div>
             <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">End Time</label>
                <input type="time" defaultValue="07:00" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
             </div>
        </div>
      </div>

      {/* Example Notification Preview */}
      <div className="border border-purple-200 bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Example Notification</h4>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex gap-3">
             <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded h-fit">
                <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
             </div>
             <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">Time for your workout! 🏃‍♂️</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">You have a running session scheduled for 07:00</p>
             </div>
        </div>
      </div>

       <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md">
            Save Notification Settings
       </button>
    </div>
  );
};

export default Notifications;