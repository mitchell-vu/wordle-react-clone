import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import * as React from 'react';
import { TbChartBar, TbMenu2, TbQuestionCircle, TbSettings } from 'react-icons/tb';

const Header: React.FC = () => {
  const { toggleSettingsModal, toggleInstructionModal, toggleStatisticsModal } = useApp();

  return (
    <header
      className={cn(
        'flex h-16 shrink-0 flex-row flex-nowrap items-center justify-between gap-2 border-b px-4',
        'transition dark:border-b-neutral-700 dark:text-white',
      )}
    >
      <div className="flex flex-row items-center justify-start md:w-1/3">
        <button>
          <TbMenu2 size="1.75rem" />
        </button>
      </div>
      <h1 className="pointer-events-none grow text-left font-karnak-condensed text-3xl font-bold md:text-center md:text-4xl">
        Wordle
      </h1>
      <div className="flex flex-row items-center justify-end gap-3 md:w-1/3">
        <button onClick={toggleInstructionModal}>
          <TbQuestionCircle size="2rem" />
        </button>
        <button onClick={toggleStatisticsModal}>
          <TbChartBar size="2rem" />
        </button>
        <button onClick={toggleSettingsModal}>
          <TbSettings size="2rem" />
        </button>
      </div>
    </header>
  );
};

export default Header;
