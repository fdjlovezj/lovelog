export interface DiaryEntry {
  id: string;
  date: string; // ISO string
  content: string;
  mood: MoodType;
  aiEnhanced: boolean;
}

export enum MoodType {
  HAPPY = 'HAPPY',
  MISSING_YOU = 'MISSING_YOU',
  EXCITED = 'EXCITED',
  CALM = 'CALM',
  SAD = 'SAD'
}

export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
