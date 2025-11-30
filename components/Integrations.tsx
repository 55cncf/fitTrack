import React, { useEffect, useState } from 'react';
import { Quote, Exercise } from '../types';
import { fetchDailyQuote, searchExercises } from '../services/api';
import { Quote as QuoteIcon, Dumbbell, RefreshCw, Search, ArrowRight, Activity } from 'lucide-react';

const Integrations: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);

  useEffect(() => {
    loadQuote();
    loadExercises('');
  }, []);

  const loadQuote = async () => {
    setLoadingQuote(true);
    const data = await fetchDailyQuote();
    setQuote(data);
    setLoadingQuote(false);
  };

  const loadExercises = async (query: string) => {
    setLoadingExercises(true);
    const data = await searchExercises(query);
    setExercises(data);
    setLoadingExercises(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Debounce would be better here in production
    loadExercises(query);
  };

  return (
    <div className="space-y-8">
      {/* Daily Motivation API Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
                 <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <QuoteIcon className="h-6 w-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold">Daily Motivation</h2>
                    <p className="text-purple-100 text-sm">Powered by Fitness Quotes API</p>
                 </div>
            </div>
            <button 
                onClick={loadQuote}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${loadingQuote ? 'animate-spin' : ''}`}
            >
                <RefreshCw className="h-5 w-5" />
            </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            {loadingQuote ? (
                <div className="h-24 flex items-center justify-center">
                    <span className="text-purple-200">Loading inspiration...</span>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-xl md:text-2xl font-serif italic mb-4 leading-relaxed">"{quote?.text}"</p>
                    <p className="font-medium text-purple-200">— {quote?.author || 'Unknown'}</p>
                </div>
            )}
        </div>
      </div>

      {/* Exercise Database API Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
         <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3">
                 <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                    <Dumbbell className="h-6 w-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Exercise Database</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Powered by Exercise API</p>
                 </div>
             </div>
             
             <button 
                onClick={() => loadExercises('')}
                className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-lg transition-colors"
             >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
             </button>
         </div>

         <div className="p-6">
            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search exercises (e.g. push-ups, legs)..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {loadingExercises ? (
                 <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    ))}
                 </div>
            ) : (
                <div className="space-y-4">
                    {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                            <div key={exercise.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-primary-200 dark:hover:border-primary-800 transition-colors shadow-sm hover:shadow-md group">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{exercise.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Target: <span className="font-medium">{exercise.muscleGroup}</span></p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 
                                      exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                    }
                                `}>
                                    {exercise.difficulty}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No exercises found matching your search.
                        </div>
                    )}
                </div>
            )}
         </div>
      </div>
      
      {/* Example Stats API Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
             <div className="flex items-center gap-3">
                 <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                    <Activity className="h-6 w-6" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fitness Statistics</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Powered by Health Stats API</p>
                 </div>
             </div>
         </div>
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average BMI (Global)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24.7</p>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Recommended Daily Steps</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10,000 steps</p>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Adults Worldwide</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">28%</p>
             </div>
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Workout Duration</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45 minutes</p>
             </div>
         </div>
      </div>
    </div>
  );
};

export default Integrations;