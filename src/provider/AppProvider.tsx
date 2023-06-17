import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';

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

const INITIAL_APP_SETTINGS = {
  hardMode: false,
  darkMode: false,
  colorBlindMode: false,
} as AppSettingsProps;

const INITIAL_GAME_STATS = {
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

interface AppContextProps {
  isPlaying: boolean;
  startPlaying: () => void;

  settings: AppSettingsProps;
  toggleSettings: (setting: keyof AppSettingsProps) => void;
  statistic: GameStatsProps;
  setStatistic: (newStats: GameStatsProps) => void;

  settingsModalOpen: boolean;
  toggleSettingsModal: () => void;
  instructionModalOpen: boolean;
  toggleInstructionModal: () => void;
  statisticsModalOpen: boolean;
  toggleStatisticsModal: () => void;
}

export const AppContext = React.createContext<AppContextProps>({
  isPlaying: false,
  startPlaying: () => {},

  settings: INITIAL_APP_SETTINGS,
  toggleSettings: () => {},
  statistic: INITIAL_GAME_STATS,
  setStatistic: () => {},

  settingsModalOpen: false,
  toggleSettingsModal: () => {},
  instructionModalOpen: false,
  toggleInstructionModal: () => {},
  statisticsModalOpen: false,
  toggleStatisticsModal: () => {},
});

AppContext.displayName = 'AppContext';

if (localStorage.getItem('wordle') === null) {
  localStorage.setItem(
    'wordle',
    JSON.stringify({
      settings: INITIAL_APP_SETTINGS,
      stats: INITIAL_GAME_STATS,
    }),
  );
}

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [localStorage, setLocalStorage] = useLocalStorage('wordle', {
    settings: INITIAL_APP_SETTINGS,
    stats: INITIAL_GAME_STATS,
  });

  const { settings, stats } = localStorage;

  const [isPlaying, setIsPlaying] = React.useState(false);

  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [instructionModalOpen, setInstructionModalOpen] = React.useState(false);
  const [statisticsModalOpen, setStatisticsModalOpen] = React.useState(false);

  const startPlaying = () => setIsPlaying(true);

  const toggleSettingsModal = () => setSettingsModalOpen((currState) => !currState);
  const toggleInstructionModal = () => setInstructionModalOpen((currState) => !currState);
  const toggleStatisticsModal = () => setStatisticsModalOpen((currState) => !currState);

  const toggleSettings = (setting: keyof AppSettingsProps) => {
    setLocalStorage((currLocalStorage) => ({
      ...currLocalStorage,
      settings: {
        ...currLocalStorage.settings,
        [setting]: !currLocalStorage.settings[setting],
      },
    }));
  };

  const setStatistic = (newStats: GameStatsProps) => {
    setLocalStorage((currLocalStorage) => ({
      ...currLocalStorage,
      stats: {
        ...currLocalStorage.settings,
        ...newStats,
      },
    }));
  };

  React.useEffect(() => {
    // Check if html tag have class dark
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <AppContext.Provider
      value={{
        isPlaying,
        startPlaying,

        settings,
        toggleSettings,

        statistic: stats,
        setStatistic,

        settingsModalOpen,
        toggleSettingsModal,
        instructionModalOpen,
        toggleInstructionModal,
        statisticsModalOpen,
        toggleStatisticsModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => React.useContext(AppContext);
