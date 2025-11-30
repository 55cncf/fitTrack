import React, { useState } from 'react';
import { User as UserType } from '../types';
import { User, Mail, Calendar, Ruler, Weight, Target, Edit2, Save, Moon, CheckSquare } from 'lucide-react';

interface ProfileProps {
  user: UserType;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, darkMode, toggleDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend here
    console.log('Saved:', profileData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 p-24 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden">
                    {user.avatar ? 
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> :
                      <User className="h-12 w-12" />
                    }
                </div>
            </div>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-primary-200">{profileData.email}</p>
            
            <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="absolute top-0 right-0 mt-6 mr-6 flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            name="name"
                            value={profileData.name} 
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            name="age"
                            type="number"
                            value={profileData.age}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Body Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Body Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Height</label>
                    <div className="relative">
                        <Ruler className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            name="height"
                            type="number"
                            value={profileData.height || 175}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                        <span className="absolute right-4 top-3 text-sm text-gray-400">cm</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Weight</label>
                    <div className="relative">
                        <Weight className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input 
                            name="weight"
                            type="number"
                            value={profileData.weight || 70}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                         <span className="absolute right-4 top-3 text-sm text-gray-400">kg</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Fitness Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Fitness Goals</h3>
             <div className="space-y-4">
                <div>
                     <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Primary Goal</label>
                     <div className="relative">
                        <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                         <select
                            name="goal"
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors appearance-none`}
                            defaultValue="lose_weight"
                         >
                            <option value="lose_weight">Lose weight</option>
                            <option value="build_muscle">Build Muscle</option>
                            <option value="improve_endurance">Improve Endurance</option>
                            <option value="maintain">Maintain Health</option>
                         </select>
                     </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Target Weight</label>
                    <div className="relative">
                        <input 
                            name="targetWeight"
                            type="number"
                            value={profileData.targetWeight || 65}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-4 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-primary-300 bg-white dark:bg-gray-900' : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'} text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-colors`}
                        />
                         <span className="absolute right-4 top-3 text-sm text-gray-400">kg</span>
                    </div>
                </div>
             </div>
        </div>

         {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferences</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 flex items-center">
                        <Moon className="h-5 w-5 mr-3 text-gray-400" />
                        Dark Mode
                    </span>
                    <button 
                        onClick={toggleDarkMode}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                     <span className="text-gray-700 dark:text-gray-300 flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-gray-400" />
                        Weekly Email Reports
                    </span>
                    <div className="h-5 w-5 text-primary-600 dark:text-primary-400">
                        <CheckSquare className="h-5 w-5" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                     <span className="text-gray-700 dark:text-gray-300 flex items-center">
                        <User className="h-5 w-5 mr-3 text-gray-400" />
                        Share Progress with Friends
                    </span>
                    <div className="h-5 w-5 border-2 border-gray-300 dark:border-gray-500 rounded"></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
