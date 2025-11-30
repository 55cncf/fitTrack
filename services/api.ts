import { Quote, Exercise } from '../types';
import { MOCK_EXERCISES } from '../constants';

// Simulating an external Quotes API
export const fetchDailyQuote = async (): Promise<Quote> => {
  try {
    // Attempt to fetch from a real free API
    const response = await fetch('https://api.quotable.io/random?tags=inspirational');
    if (response.ok) {
      const data = await response.json();
      return {
        text: data.content,
        author: data.author
      };
    }
    throw new Error('API failed');
  } catch (error) {
    // Fallback if API fails (offline or rate limited)
    return {
      text: "The only bad workout is the one that didn't happen.",
      author: "Fitness Wisdom"
    };
  }
};

// Simulating an external Exercise Database API
export const searchExercises = async (query: string): Promise<Exercise[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!query) return MOCK_EXERCISES;

  const lowerQuery = query.toLowerCase();
  return MOCK_EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(lowerQuery) ||
    ex.muscleGroup.toLowerCase().includes(lowerQuery)
  );
};
