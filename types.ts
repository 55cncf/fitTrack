export interface User {
  name: string;
  username: string;
  email: string;
  age: number;
  height?: number; // cm
  weight?: number; // kg
  goal?: string;
  targetWeight?: number;
  avatar?: string;
}

export interface Workout {
  id: string;
  title: string;
  date: string;
  duration: number; // minutes
  calories: number;
  type: 'Running' | 'Weight Training' | 'Cycling' | 'Yoga' | 'HIIT';
  distance?: number; // km
  heartRate?: number; // bpm
  description?: string;
  intensity?: 'Low' | 'Moderate' | 'High';
  image?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: string;
  instructions: string;
}

export interface Quote {
  text: string;
  author: string;
}

export interface NotificationSetting {
  id: string;
  type: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  emailReports: boolean;
  publicProfile: boolean;
  unitSystem: 'metric' | 'imperial';
}
