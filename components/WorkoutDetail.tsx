import React from 'react';
import { ArrowLeft, Clock, Flame, Activity, MapPin, Share2, Edit2, PlayCircle } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutDetailProps {
  workout: Workout;
  onBack: () => void;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header / Nav */}
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium mb-4"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src={workout.image || 'https://picsum.photos/800/400'} 
          alt={workout.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{workout.title}</h1>
                    <div className="flex items-center gap-4 text-gray-200 text-sm md:text-base">
                        <span>{new Date(workout.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {workout.distance && (
                             <>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> Central Park Trail</span>
                             </>
                        )}
                    </div>
                </div>
                <button className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-colors">
                    <PlayCircle className="h-5 w-5" />
                    <span>Replay Route</span>
                </button>
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mb-2">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Duration</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.duration} minutes</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg mb-2">
                <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Calories</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.calories}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mb-2">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Distance</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.distance ? `${workout.distance} km` : 'N/A'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mb-2">
                <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Heart Rate</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.heartRate ? `${workout.heartRate} bpm` : 'N/A'}</p>
        </div>
      </div>

      {/* Description & Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Description</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {workout.description || 'No description provided for this workout.'}
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Additional Details</h3>
        <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Average Pace</span>
                <span className="font-medium text-gray-900 dark:text-white">8:40 min/km</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Workout Type</span>
                <span className="font-medium text-gray-900 dark:text-white">{workout.type}</span>
            </div>
            <div className="flex justify-between py-3">
                <span className="text-gray-600 dark:text-gray-400">Intensity</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    workout.intensity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                    workout.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                    {workout.intensity || 'Moderate'}
                </span>
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-primary-600/20 flex justify-center items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Share Workout
        </button>
        <button className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors flex justify-center items-center">
            <Edit2 className="h-5 w-5 mr-2" />
            Edit Details
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetail;
