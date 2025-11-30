import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import WorkoutDetail from './components/WorkoutDetail';
import Profile from './components/Profile';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import Integrations from './components/Integrations';
import { User, Workout } from './types';
import { MOCK_WORKOUTS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  // Workouts State with Local Storage persistence
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const savedWorkouts = localStorage.getItem('fittrack_workouts');
      return savedWorkouts ? JSON.parse(savedWorkouts) : MOCK_WORKOUTS;
    } catch (e) {
      return MOCK_WORKOUTS;
    }
  });

  // Persist workouts whenever they change
  useEffect(() => {
    localStorage.setItem('fittrack_workouts', JSON.stringify(workouts));
  }, [workouts]);

  // Persist User Session & Theme
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fittrack_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      const savedTheme = localStorage.getItem('fittrack_theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error("Error loading persisted data", e);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('fittrack_user', JSON.stringify(userData));
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fittrack_user');
    navigate('/');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('fittrack_user', JSON.stringify(updatedUser));
  };

  const handleToggleWorkout = (id: string) => {
    setWorkouts(prevWorkouts => prevWorkouts.map(w => {
      if (w.id === id) {
        return { ...w, completed: !w.completed };
      }
      return w;
    }));
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fittrack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fittrack_theme', 'light');
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout 
      onLogout={handleLogout}
      userAvatar={user.avatar}
      userName={user.name}
    >
      <Routes>
        <Route path="/" element={
          <Dashboard 
            user={user} 
            workouts={workouts} 
            onStartWorkout={() => console.log('Start workout')}
            onToggleWorkout={handleToggleWorkout}
          />
        } />
        <Route path="/workout/:id" element={
          <WorkoutDetail workouts={workouts} />
        } />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={
          <Profile 
            user={user} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode}
            onUpdateUser={handleUpdateUser}
          />
        } />
        <Route path="/settings" element={
           <Profile 
            user={user} 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode}
            onUpdateUser={handleUpdateUser}
          />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;