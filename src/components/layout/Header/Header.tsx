import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import { ChartBar, Gear, GithubLogo, Question } from '@phosphor-icons/react';
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
      <div className="flex h-full flex-row items-center justify-start md:w-1/3">
        <a
          href="https://github.com/mitchell-vu/wordle-react-clone"
          target="_blank"
          className="flex h-full cursor-pointer items-center justify-center px-3 hover:bg-neutral-700"
        >
          <GithubLogo size={24} weight="bold" />
        </a>
      </div>

      <h1
        className={cn(
          'font-karnak-condensed pointer-events-none grow text-left text-2xl font-bold',
          'sm:text-3xl md:text-center md:text-4xl',
        )}
      >
        Wordle
      </h1>

      <div className="flex h-full flex-row items-center justify-end md:w-1/3">
        {[
          {
            key: 'instruction',
            icon: Question,
            onClick: toggleInstructionModal,
          },
          {
            key: 'statistics',
            icon: ChartBar,
            onClick: toggleStatisticsModal,
          },
          {
            key: 'settings',
            icon: Gear,
            onClick: toggleSettingsModal,
          },
        ].map(({ key, icon: Icon, onClick }) => (
          <button key={key} className="h-full cursor-pointer px-3 hover:bg-neutral-700" onClick={onClick}>
            <Icon size={24} className="sm:h-8 sm:w-8" />
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
