
export interface DiaryEntry {
  id: string;
  date: string; // ISO string
  content: string;
  title?: string;
  isPinned?: boolean;
}

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface WeatherData {
  temp?: number;
  condition?: string;
  isDay?: boolean;
  season: Season;
}

export enum MoodType {
  HAPPY = 'HAPPY',
  EXCITED = 'EXCITED',
  GRATEFUL = 'GRATEFUL',
  MISSING_YOU = 'MISSING_YOU',
  ROMANTIC = 'ROMANTIC',
  SAD = 'SAD'
}