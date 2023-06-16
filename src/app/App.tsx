import Header from '@/components/Header/Header';
import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import * as React from 'react';
import Game from './Game/Game';
import { InstructionModal, SettingsModal, StatisticsModal } from './Modal';
import Welcome from './Welcome/Welcome';

const App: React.FC = () => {
  const { isPlaying, settings } = useApp();
  const { darkTheme } = settings;

  return (
    <div className={cn({ dark: darkTheme, light: !darkTheme })}>
      <Welcome />
      {isPlaying && (
        <div className="flex h-screen max-h-screen flex-col bg-white p-0 font-franklin transition dark:bg-neutral-950">
          <Header />
          <Game />

          <SettingsModal />
          <InstructionModal />
          <StatisticsModal />
        </div>
      )}
    </div>
  );
};

export default App;
