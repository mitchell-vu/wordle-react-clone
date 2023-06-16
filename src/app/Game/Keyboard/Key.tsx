import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import * as React from 'react';
import styles from './Keyboard.module.sass';

interface KeyProps {
  letter?: string;
  className?: string;
  onClick?: (letter: string) => void;
  icon?: React.ReactNode;
  state?: string;
}

const Key: React.FC<KeyProps> = ({ letter, className, onClick, icon, state }) => {
  const { settings } = useApp();
  const { colorBlindMode } = settings;

  return letter && onClick ? (
    <button
      className={cn(
        styles.key,
        'mr-[6px] flex h-[58px] items-center justify-center text-xl font-bold uppercase',
        'select-none rounded border-0 p-0  outline-0 last-of-type:m-0',
        className,
        {
          'bg-neutral-200 text-black dark:bg-neutral-500 dark:text-white': !state,
          'bg-green-500 text-white dark:bg-green-600': state === 'correct',
          'bg-yellow-500 text-white dark:bg-yellow-600': state === 'present',
          'bg-neutral-500 text-white dark:bg-neutral-700': state === 'absent',
          '!bg-orange-500': colorBlindMode && state === 'correct',
          '!bg-blue-400': colorBlindMode && state === 'present',
        },
      )}
      onClick={() => onClick(letter)}
      data-state={state}
    >
      {icon ?? letter}
    </button>
  ) : (
    <div className={cn(className)}></div>
  );
};

export default Key;
