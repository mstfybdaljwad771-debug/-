export type JourneyStage = 'singularity' | 'warp' | 'rewind' | 'main';

export interface TimelineStation {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  dateStr?: string;
  description: string;
  quote?: string;
  mustafaThought: string;
  iconType: 'chat' | 'heart' | 'phone' | 'clock' | 'smile' | 'storm' | 'baby';
  badgeColor: string;
}

export interface MonaTrait {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  secretNote: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    reaction: string;
  }[];
  hint?: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  imageUrl?: string;
  placeholderBg: string;
}
