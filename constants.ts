import { Workout, NotificationSetting, Exercise } from './types';

export const MOCK_WORKOUTS: Workout[] = [
  {
    id: '0',
    title: 'Evening Yoga',
    date: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // 5 hours from now
    duration: 30,
    calories: 120,
    type: 'Yoga',
    description: 'Relaxing flow before bed.',
    intensity: 'Low',
    image: 'https://picsum.photos/id/65/800/400',
    completed: false
  },
  {
    id: '1',
    title: 'Morning Run',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    duration: 45,
    calories: 450,
    type: 'Running',
    distance: 5.2,
    heartRate: 145,
    description: 'Great morning run through the park. Weather was perfect and felt strong throughout the workout.',
    intensity: 'Moderate',
    image: 'https://picsum.photos/id/73/800/400',
    completed: true
  },
  {
    id: '2',
    title: 'Weight Training',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    duration: 60,
    calories: 320,
    type: 'Weight Training',
    description: 'Upper body focus. Hit new PR on bench press.',
    intensity: 'High',
    image: 'https://picsum.photos/id/20/800/400',
    completed: true
  },
  {
    id: '3',
    title: 'Cycling',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    duration: 30,
    calories: 280,
    type: 'Cycling',
    distance: 10,
    description: 'Indoor cycling session.',
    intensity: 'Moderate',
    image: 'https://picsum.photos/id/74/800/400',
    completed: true
  },
  {
    id: '4',
    title: 'Yoga Flow',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    duration: 45,
    calories: 150,
    type: 'Yoga',
    description: 'Restorative yoga to help with recovery.',
    intensity: 'Low',
    image: 'https://picsum.photos/id/65/800/400',
    completed: true
  }
];

export const DEFAULT_NOTIFICATIONS: NotificationSetting[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Workout Reminders',
    description: 'Get reminded to complete your daily workout',
    enabled: true
  },
  {
    id: '2',
    type: 'goal',
    title: 'Goal Alerts',
    description: 'Notifications when you reach your fitness goals',
    enabled: true
  },
  {
    id: '3',
    type: 'report',
    title: 'Weekly Reports',
    description: 'Summary of your weekly fitness progress',
    enabled: true
  },
  {
    id: '4',
    type: 'badge',
    title: 'Achievement Badges',
    description: 'Celebrate when you unlock new achievements',
    enabled: true
  },
  {
    id: '5',
    type: 'social',
    title: 'Friend Activity',
    description: 'Updates when your friends complete workouts',
    enabled: false
  }
];

export const MOCK_EXERCISES: Exercise[] = [
  { id: '1', name: 'Push-ups', muscleGroup: 'Chest', difficulty: 'Beginner', instructions: 'Keep body straight, lower until chest touches floor.' },
  { id: '2', name: 'Squats', muscleGroup: 'Legs', difficulty: 'Beginner', instructions: 'Feet shoulder width apart, lower hips back and down.' },
  { id: '3', name: 'Plank', muscleGroup: 'Abs', difficulty: 'Intermediate', instructions: 'Hold push-up position on elbows.' },
  { id: '4', name: 'Lunges', muscleGroup: 'Legs', difficulty: 'Beginner', instructions: 'Step forward with one leg, lower hips until both knees are bent at 90 degrees.' },
  { id: '5', name: 'Burpees', muscleGroup: 'Full Body', difficulty: 'Advanced', instructions: 'Squat, kick feet back, push-up, jump forward, jump up.' },
  { id: '6', name: 'Pull-ups', muscleGroup: 'Back', difficulty: 'Intermediate', instructions: 'Hang from bar, pull chin over bar.' },
];