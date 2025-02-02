import { AppSettingsProps, GameStatsProps, INITIAL_APP_SETTINGS, INITIAL_GAME_STATS } from '@/constants/config';
import AppContext from '@/contexts/AppContext';
import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';

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
