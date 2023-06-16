import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import * as React from 'react';
import { TbChartBar, TbMenu2, TbQuestionCircle, TbSettings } from 'react-icons/tb';

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
          <TbMenu2 className="h-6 w-6 sm:h-8 sm:w-8" />
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
          <TbQuestionCircle className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button onClick={toggleStatisticsModal}>
          <TbChartBar className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
        <button onClick={toggleSettingsModal}>
          <TbSettings className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>
    </header>
  );
};

export default Header;
