import React from 'react';
import { Flame, Activity, Clock, Plus, Calendar, Target, Zap, ChevronRight, CheckSquare, Square, MoreHorizontal } from 'lucide-react';
import { Workout } from '../types';

interface DashboardProps {
  user: any;
  workouts: Workout[];
  onViewWorkout: (id: string) => void;
  onStartWorkout: () => void;
}

interface WorkoutCardProps {
  workout: Workout;
  isUpcoming: boolean;
  onViewWorkout: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, isUpcoming, onViewWorkout }) => (
  <div 
   onClick={() => onViewWorkout(workout.id)}
   className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer transition-all hover:shadow-md flex flex-col h-full"
 >
   <div className="h-32 overflow-hidden relative">
      <img src={workout.image || 'https://picsum.photos/400/200'} alt={workout.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
      <div className="absolute top-2 right-2 flex gap-2">
         <span className={`px-2 py-1 rounded text-xs font-bold backdrop-blur-sm 
             ${workout.intensity === 'High' ? 'bg-red-500/80 text-white' : 
               workout.intensity === 'Moderate' ? 'bg-yellow-500/80 text-white' : 
               'bg-green-500/80 text-white'}`}>
             {workout.intensity}
         </span>
      </div>
      {isUpcoming && (
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
      )}
   </div>
   
   <div className="p-4 flex-1 flex flex-col">
     <div className="flex justify-between items-start mb-2">
         <div>
             <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">{workout.title}</h3>
             <p className="text-xs text-gray-500 dark:text-gray-400">{workout.type}</p>
         </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1" onClick={(e) => { e.stopPropagation(); /* Menu logic */ }}>
             <MoreHorizontal className="h-5 w-5" />
         </button>
     </div>

     <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
         <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
             <Clock className="h-4 w-4 mr-1" />
             {workout.duration} min
         </div>
         <button 
             className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
             onClick={(e) => { e.stopPropagation(); /* Toggle status logic */ }}
             title={isUpcoming ? "Mark as Done" : "Mark as Not Done"}
         >
             {isUpcoming ? 
                 <Square className="h-6 w-6 text-gray-400" /> : 
                 <CheckSquare className="h-6 w-6 text-primary-600" />
             }
         </button>
     </div>
   </div>
 </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user, workouts, onViewWorkout, onStartWorkout }) => {
  // Calculated stats for demo
  const caloriesBurned = 2450;
  const goalsCompleted = 12;
  const weeklyProgress = 15;
  const activeTime = "3h 25m";

  // Separate workouts into "Upcoming" and "History"
  const now = new Date();
  const upcomingWorkouts = workouts.filter(w => new Date(w.date) > now);
  const pastWorkouts = workouts.filter(w => new Date(w.date) <= now);

  return (
    <div className="space-y-8 pb-20"> {/* pb-20 for FAB space */}
      {/* Welcome Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 text-white min-h-[180px] flex items-center">
        <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
               alt="Hero" 
               className="w-full h-full object-cover opacity-40"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Hello, {user?.name || 'Friend'}!</h1>
          <p className="text-gray-300 text-lg">Use the <span className="inline-block bg-primary-600 rounded-full p-1 mx-1"><Plus className="h-3 w-3" /></span> button to create some habits or log a workout!</p>
        </div>
      </div>

      {/* Upcoming Tasks Section (To Do) */}
      <div>
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Tasks</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{upcomingWorkouts.length} tasks</span>
         </div>
         {upcomingWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingWorkouts.map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} isUpcoming={true} onViewWorkout={onViewWorkout} />
                ))}
            </div>
         ) : (
             <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">No upcoming tasks. You're all caught up!</p>
                <button onClick={onStartWorkout} className="mt-4 text-primary-600 font-medium hover:underline">Add a new task</button>
             </div>
         )}
      </div>

      {/* Stats Grid - Kept simple */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/30', label: 'Calories', value: caloriesBurned.toLocaleString() },
          { icon: Target, color: 'text-blue-500', bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30', label: 'Goals', value: `${goalsCompleted}/15` },
          { icon: Activity, color: 'text-green-500', bg: 'bg-green-100', darkBg: 'dark:bg-green-900/30', label: 'Progress', value: `+${weeklyProgress}%` },
          { icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/30', label: 'Active', value: activeTime },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
            <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent History Section (Done) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent History</h2>
        </div>
        
        {pastWorkouts.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} isUpcoming={false} onViewWorkout={onViewWorkout} />
              ))}
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-gray-500">No completed activities yet.</p>
            </div>
        )}
      </div>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={onStartWorkout}
        className="fixed bottom-6 right-6 h-14 w-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-600/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-30"
        aria-label="Add New"
      >
        <Plus className="h-8 w-8" />
      </button>
    </div>
  );
};

export default Dashboard;