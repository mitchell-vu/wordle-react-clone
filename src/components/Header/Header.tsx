import { useApp } from '@/provider/AppProvider';
import { ChartBar, Gear, List, Question } from '@phosphor-icons/react';
import cn from 'classnames';
import * as React from 'react';

const Header: React.FC = () => {
  const { toggleSettingsModal, toggleInstructionModal, toggleStatisticsModal } = useApp();

  return (
    <header
      className={cn(
        'flex h-10 shrink-0 flex-row flex-nowrap items-center justify-between gap-2 border-b px-4',
        'sm:h-16',
        'transition dark:border-b-neutral-700 dark:text-white',
      )}
    >
      <div className="flex flex-row items-center justify-start md:w-1/3">
        <button>
          <List className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>
      <h1
        className={cn(
          'pointer-events-none grow text-left font-karnak-condensed text-2xl font-bold',
          'sm:text-3xl md:text-center md:text-4xl',
        )}
      >
        Wordle
      </h1>
      <div className="flex flex-row items-center justify-end gap-2 sm:gap-3 md:w-1/3">
        <button onClick={toggleInstructionModal}>
          <Question className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button onClick={toggleStatisticsModal}>
          <ChartBar className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button onClick={toggleSettingsModal}>
          <Gear className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;
