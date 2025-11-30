import React from 'react';
import { ArrowLeft, Clock, Flame, Activity, MapPin, Share2, Edit2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Workout } from '../types';

interface WorkoutDetailProps {
  workouts: Workout[];
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workouts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 text-lg mb-4">Workout not found.</p>
        <button 
          onClick={() => navigate('/')}
          className="text-primary-600 hover:underline"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header / Nav */}
      <button 
        onClick={() => navigate('/')}
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
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{workout.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm md:text-base">
                        <span>{new Date(workout.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {workout.distance && (
                             <>
                                <span className="hidden sm:inline w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> Central Park Trail</span>
                             </>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                    <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg">
                        <Edit2 className="h-4 w-4" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mb-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.duration} min</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mb-2">
                <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Calories</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.calories}</p>
        </div>
        {workout.distance && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mb-2">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.distance} km</p>
            </div>
        )}
        {workout.heartRate && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mb-2">
                    <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Heart Rate</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{workout.heartRate} bpm</p>
            </div>
        )}
      </div>

      {/* Description & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {workout.description || 'No description provided for this workout.'}
                  </p>
              </div>

              {/* Intensity Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Workout Intensity</h3>
                  <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div 
                              className={`h-full rounded-full ${
                                  workout.intensity === 'High' ? 'bg-red-500 w-3/4' : 
                                  workout.intensity === 'Moderate' ? 'bg-yellow-500 w-1/2' : 
                                  'bg-green-500 w-1/4'
                              }`}
                          ></div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${workout.intensity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                            workout.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                          {workout.intensity}
                      </span>
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              {/* Additional Details Side Panel */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Additional Details</h3>
                  <div className="space-y-4">
                      {workout.distance && workout.duration && (
                          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                              <span className="text-gray-500 dark:text-gray-400">Average Pace</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                  {Math.round((workout.duration / workout.distance) * 100) / 100} min/km
                              </span>
                          </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">Workout Type</span>
                          <span className="font-medium text-gray-900 dark:text-white">{workout.type}</span>
                      </div>
                      <div className="flex justify-between py-2">
                          <span className="text-gray-500 dark:text-gray-400">Status</span>
                          <span className={`font-medium ${workout.completed ? 'text-green-600' : 'text-blue-600'}`}>
                              {workout.completed ? 'Completed' : 'Planned'}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;