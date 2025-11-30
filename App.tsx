import React, { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Persist User Session & Theme
  useEffect(() => {
    const savedUser = localStorage.getItem('fittrack_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedTheme = localStorage.getItem('fittrack_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('fittrack_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fittrack_user');
    setCurrentPage('dashboard');
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

  const renderContent = () => {
    if (selectedWorkoutId) {
       const workout = MOCK_WORKOUTS.find(w => w.id === selectedWorkoutId);
       if (workout) {
          return <WorkoutDetail workout={workout} onBack={() => setSelectedWorkoutId(null)} />;
       }
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            workouts={MOCK_WORKOUTS} 
            onViewWorkout={(id) => setSelectedWorkoutId(id)} 
            onStartWorkout={() => console.log('Start workout')}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile user={user!} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'notifications':
        return <Notifications />;
      case 'integrations':
        return <Integrations />;
      case 'settings':
        return <Profile user={user!} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />; // Reusing Profile as Settings for simplicity in this demo
      default:
        return (
            <Dashboard 
                user={user} 
                workouts={MOCK_WORKOUTS} 
                onViewWorkout={(id) => setSelectedWorkoutId(id)} 
                onStartWorkout={() => console.log('Start workout')}
            />
        );
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activePage={currentPage} 
      onNavigate={(page) => {
          setCurrentPage(page);
          setSelectedWorkoutId(null);
      }} 
      onLogout={handleLogout}
      userAvatar={user.avatar}
      userName={user.name}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
