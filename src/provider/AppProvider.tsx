import * as React from 'react';

interface AppContextProps {
  isPlaying: boolean;
  startPlaying: () => void;
  darkMode: boolean;
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
  darkMode: false,
  settingsModalOpen: false,
  toggleSettingsModal: () => {},
  instructionModalOpen: false,
  toggleInstructionModal: () => {},
  statisticsModalOpen: false,
  toggleStatisticsModal: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);
  const [instructionModalOpen, setInstructionModalOpen] = React.useState(false);
  const [statisticsModalOpen, setStatisticsModalOpen] = React.useState(false);

  const startPlaying = () => setIsPlaying(true);

  const toggleSettingsModal = () => setSettingsModalOpen((currState) => !currState);
  const toggleInstructionModal = () => setInstructionModalOpen((currState) => !currState);
  const toggleStatisticsModal = () => setStatisticsModalOpen((currState) => !currState);

  return (
    <AppContext.Provider
      value={{
        isPlaying,
        startPlaying,
        darkMode: false,
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
