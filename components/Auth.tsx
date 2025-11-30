import React, { useState } from 'react';
import { User, Lock, Mail, Calendar, ArrowRight, Activity, AlertCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (userData: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors as user types
    if (generalError) setGeneralError('');
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    const newErrors: Record<string, string> = {};
    let hasEmptyFields = false;

    if (isLogin) {
      // Login Validation
      if (!formData.username.trim()) { hasEmptyFields = true; newErrors.username = 'Username is required'; }
      if (!formData.email.trim()) { hasEmptyFields = true; newErrors.email = 'Email is required'; }
      if (!formData.password.trim()) { hasEmptyFields = true; newErrors.password = 'Password is required'; }
      
      // Basic format check for email in login to be helpful
      if (formData.email.trim() && !validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      // Registration Validation
      if (!formData.name.trim()) { hasEmptyFields = true; newErrors.name = 'Full Name is required'; }
      if (!formData.username.trim()) { hasEmptyFields = true; newErrors.username = 'Username is required'; }
      if (!formData.email.trim()) { hasEmptyFields = true; newErrors.email = 'Email is required'; }
      if (!formData.age.trim()) { hasEmptyFields = true; newErrors.age = 'Age is required'; }
      if (!formData.password.trim()) { hasEmptyFields = true; newErrors.password = 'Password is required'; }
      if (!formData.confirmPassword.trim()) { hasEmptyFields = true; newErrors.confirmPassword = 'Confirm Password is required'; }

      // Robust Field Validation
      if (formData.name.trim()) {
        if (formData.name.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
          newErrors.name = 'Name should only contain letters and spaces';
        }
      }

      if (formData.username.trim()) {
        if (formData.username.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }
      }

      if (formData.email.trim() && !validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (formData.age.trim()) {
        const ageNum = parseInt(formData.age);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
          newErrors.age = 'You must be between 13 and 120 years old';
        }
      }

      if (formData.password.trim() && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (formData.confirmPassword.trim() && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (hasEmptyFields) {
      setGeneralError('All fields should be filled');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Login Logic (Simulation)
    if (isLogin) {
      // Hardcoded check for demonstration purposes
      if (formData.password !== 'password') {
        setGeneralError('Incorrect password. Please try again.');
        return;
      }
    }

    // Success - Simulate auth
    onLogin({
      name: formData.name || 'Demo User',
      username: formData.username || 'demouser',
      email: formData.email || 'user@fittrack.com',
      age: parseInt(formData.age) || 25,
      avatar: 'https://picsum.photos/id/64/200/200'
    });
  };

  const getInputClass = (fieldName: string) => {
    return `block w-full pl-10 pr-3 py-3 border ${
      errors[fieldName] 
        ? 'border-red-500 focus:ring-red-500 text-red-900 placeholder-red-300' 
        : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 text-gray-900 dark:text-white placeholder-gray-400'
    } rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:border-transparent transition-all`;
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Image Section - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Fitness Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 text-white">
          <div className="mb-6">
            <Activity className="h-16 w-16 mb-6 text-primary-400" />
            <h1 className="text-5xl font-bold mb-4">Transform Your Life</h1>
            <p className="text-xl text-gray-200">Start your fitness journey today. Track workouts, analyze progress, and reach your goals.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-6">
               <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                  <Activity className="h-8 w-8 text-white" />
               </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? 'Sign in to continue your fitness journey' : 'Start your fitness journey today'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {/* General Error Alert */}
            {generalError && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{generalError}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={getInputClass('name')}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${errors.username ? 'text-red-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={getInputClass('username')}
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={getInputClass('email')}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className={`h-5 w-5 ${errors.age ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        className={getInputClass('age')}
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={getInputClass('password')}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                 {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              
              {!isLogin && (
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={getInputClass('confirmPassword')}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                     {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-md hover:shadow-lg"
              >
                {isLogin ? 'Login' : 'Register'}
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <ArrowRight className="h-5 w-5 text-primary-300 group-hover:text-primary-100" />
                </span>
              </button>
              {isLogin && <p className="text-center text-xs text-gray-400 mt-2">Tip: Use password 'password' to login</p>}
            </div>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setGeneralError('');
                }}
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;