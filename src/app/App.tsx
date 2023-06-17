import { ToastContainer } from '@/components';
import Header from '@/components/Header/Header';
import { useApp } from '@/provider/AppProvider';
import { isIos } from '@/utils/helpers';
import cn from 'classnames';
import * as React from 'react';
import Game from './Game/Game';
import { InstructionModal, SettingsModal, StatisticsModal } from './Modal';
import Welcome from './Welcome/Welcome';

const App: React.FC = () => {
  const { isPlaying } = useApp();

  return (
    <div
      className={cn('absolute left-0 top-0 h-full w-full', {
        'min-h-screen-mobile': isIos(),
        'min-h-screen': !isIos(),
      })}
    >
      <Welcome />
      {isPlaying && (
        <div className="flex h-full max-h-screen flex-col bg-white p-0 font-franklin transition dark:bg-neutral-950">
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
