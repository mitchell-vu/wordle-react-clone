import { AppSettingsProps, GameStatsProps, INITIAL_APP_SETTINGS, INITIAL_GAME_STATS } from '@/constants/config';
import * as React from 'react';

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

const AppContext = React.createContext<AppContextProps>({
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

export default AppContext;
