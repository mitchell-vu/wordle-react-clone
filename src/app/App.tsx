import * as React from 'react';
import Header from '../components/Header/Header';
import { useApp } from '../provider/AppProvider';
import Game from './Game/Game';
import { InstructionModal, SettingsModal, StatisticsModal } from './Modal';
import Welcome from './Welcome/Welcome';

const App: React.FC = () => {
  const { isPlaying } = useApp();

  return !isPlaying ? (
    <Welcome />
  ) : (
    <div className="flex h-screen max-h-screen flex-col font-franklin">
      <Header />
      <Game />

      <SettingsModal />
      <InstructionModal />
      <StatisticsModal />
    </div>
  );
};

export default App;
