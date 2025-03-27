export interface UserProfile {
  uid: string;
  username: string | null;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  highScore: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameScore {
  uid: string;
  username: string;
  score: number;
  timestamp: Date;
}

export interface LeaderboardEntry {
  uid: string;
  username: string;
  highScore: number;
  avatarUrl: string | null;
  rank?: number;
}

export type AuthProvider = 'email' | 'google' | 'apple';

export interface SignUpFormData {
  email: string;
  password: string;
  username?: string;
}

export interface UserSettings {
  email: string;
  isPublic: boolean;
  notifications: {
    email: boolean;
    push: boolean;
  };
} 