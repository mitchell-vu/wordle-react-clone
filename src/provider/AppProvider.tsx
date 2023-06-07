import * as React from 'react';

interface AppContextProps {
  darkMode: boolean;
  settingsModalOpen: boolean;
  toggleSettingsModal: () => void;
}

export const AppContext = React.createContext<AppContextProps>({
  darkMode: false,
  settingsModalOpen: false,
  toggleSettingsModal: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);

  const toggleSettingsModal = () => {
    setSettingsModalOpen(!settingsModalOpen);
  };

  return (
    <AppContext.Provider value={{ darkMode: false, settingsModalOpen, toggleSettingsModal }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => React.useContext(AppContext);
