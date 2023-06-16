import * as React from 'react';
import { useLocalStorage } from 'usehooks-ts';

export interface AppSettingsProps {
  hardMode: boolean;
  darkTheme: boolean;
  colorblindMode: boolean;
}

interface AppContextProps {
  isPlaying: boolean;
  startPlaying: () => void;
  settings: AppSettingsProps;
  toggleSettings: (setting: keyof AppSettingsProps) => void;
  settingsModalOpen: boolean;
  toggleSettingsModal: () => void;
  instructionModalOpen: boolean;
  toggleInstructionModal: () => void;
  statisticsModalOpen: boolean;
  toggleStatisticsModal: () => void;
}

const INITIAL_APP_SETTINGS = {
  hardMode: false,
  darkTheme: false,
  colorblindMode: false,
};

export const AppContext = React.createContext<AppContextProps>({
  isPlaying: false,
  startPlaying: () => {},
  settings: INITIAL_APP_SETTINGS,
  toggleSettings: () => {},
  settingsModalOpen: false,
  toggleSettingsModal: () => {},
  instructionModalOpen: false,
  toggleInstructionModal: () => {},
  statisticsModalOpen: false,
  toggleStatisticsModal: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [settings, setSettings] = useLocalStorage('settings', INITIAL_APP_SETTINGS);

  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [instructionModalOpen, setInstructionModalOpen] = React.useState(false);
  const [statisticsModalOpen, setStatisticsModalOpen] = React.useState(false);

  const startPlaying = () => setIsPlaying(true);

  const toggleSettingsModal = () => setSettingsModalOpen((currState) => !currState);
  const toggleInstructionModal = () => setInstructionModalOpen((currState) => !currState);
  const toggleStatisticsModal = () => setStatisticsModalOpen((currState) => !currState);

  const toggleSettings = (setting: keyof AppSettingsProps) => {
    setSettings((currSettings) => ({
      ...currSettings,
      [setting]: !currSettings[setting],
    }));
  };

  React.useEffect(() => {
    // Check if html tag have class dark
    if (settings.darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkTheme]);

  return (
    <AppContext.Provider
      value={{
        isPlaying,
        startPlaying,
        settings,
        toggleSettings,
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
