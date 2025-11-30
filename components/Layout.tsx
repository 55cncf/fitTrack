import React, { useState } from 'react';
import { Menu, X, Home, Activity, BarChart2, Settings, User, Bell, LogOut, Database } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userAvatar?: string;
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, onLogout, userAvatar, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const getPageTitle = (id: string) => {
    const item = navItems.find(i => i.id === id);
    return item ? item.label : 'FitTrack Pro';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden fixed top-0 w-full z-20 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600 dark:text-gray-300" /> : <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />}
            </button>
            <span className="font-bold text-lg text-gray-900 dark:text-white truncate">
                {getPageTitle(activePage)}
            </span>
        </div>
        <button 
            onClick={() => onNavigate('settings')} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
        >
          <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <Activity className="h-8 w-8 text-primary-600 mr-2" />
            <span className="font-bold text-2xl text-gray-900 dark:text-white">FitTrack</span>
          </div>

          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold text-lg overflow-hidden">
                {userAvatar ? <img src={userAvatar} alt="User" className="h-full w-full object-cover" /> : userName?.charAt(0) || 'U'}
             </div>
             <div>
               <p className="text-sm font-medium text-gray-900 dark:text-white">{userName || 'User'}</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">Basic Member</p>
             </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                      `}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-3 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getPageTitle(activePage)}</h1>
             <button 
                onClick={() => onNavigate('settings')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Settings"
             >
                <Settings className="h-6 w-6 text-gray-500 dark:text-gray-400" />
             </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 mt-14 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;