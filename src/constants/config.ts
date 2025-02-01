export interface AppSettingsProps {
  hardMode: boolean;
  darkMode: boolean;
  colorBlindMode: boolean;
}
export interface GameStatsProps {
  averageGuesses: number;
  currentStreak: number;
  gamesPlayed: number;
  gamesWon: number;
  guesses: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    fail: number;
  };
  hasPlayed: boolean;
  isOnStreak: boolean;
  maxStreak: number;
  winPercentage: number;
}

export const INITIAL_APP_SETTINGS = {
  hardMode: false,
  darkMode: false,
  colorBlindMode: false,
} as AppSettingsProps;

export const INITIAL_GAME_STATS = {
  averageGuesses: 0,
  currentStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 2,
    6: 0,
    fail: 0,
  },
  hasPlayed: false,
  isOnStreak: false,
  maxStreak: 0,
  winPercentage: 0,
} as GameStatsProps;
