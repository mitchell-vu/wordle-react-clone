import WORDS from '@/assets/data/word-list.json';
import { ToastContainer } from '@/components';
import Header from '@/components/layout/Header/Header';
import { useApp, useGame } from '@/hooks';
import { cn } from '@/utils/classnames';
import { isIos } from '@/utils/helpers';
import * as React from 'react';
import Game from './Game/Game';
import { InstructionModal, SettingsModal, StatisticsModal } from './Modal';
import Welcome from './Welcome/Welcome';

const App: React.FC = () => {
  const { isPlaying } = useApp();
  const { startNewGame } = useGame();

  // Set random word on server-side
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);

    startNewGame(WORDS[randomIndex] as string);
  }, [startNewGame]);

  return (
    <div
      className={cn('absolute top-0 left-0 h-full w-full', {
        'min-h-screen-mobile': isIos(),
        'min-h-screen': !isIos(),
      })}
    >
      <Welcome />

      {isPlaying && (
        <div className="font-franklin flex h-full max-h-screen flex-col bg-white p-0 transition dark:bg-neutral-950">
          <Header />

          <Game />

          <SettingsModal />
          <InstructionModal />
          <StatisticsModal />

          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default App;
