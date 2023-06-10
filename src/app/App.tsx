import Header from '@/components/Header/Header';
import { useApp } from '@/provider/AppProvider';
import * as React from 'react';
import Game from './Game/Game';
import { InstructionModal, SettingsModal, StatisticsModal } from './Modal';
import Welcome from './Welcome/Welcome';

const App: React.FC = () => {
  const { isPlaying } = useApp();

  return (
    <>
      <Welcome />
      {isPlaying && (
        <>
          <div className="flex h-screen max-h-screen flex-col font-franklin">
            <Header />
            <Game />

            <SettingsModal />
            <InstructionModal />
            <StatisticsModal />
          </div>
        </>
      )}
    </>
  );
};

export default App;
