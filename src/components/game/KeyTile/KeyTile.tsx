import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import React from 'react';
import styles from './KeyTile.module.css';

interface KeyTileProps {
  letter?: string;
  state?: string;
  size?: number;
  className?: string;
}

const KeyTile: React.FC<KeyTileProps> = ({ letter = '', state = 'empty', size, className }) => {
  const { settings } = useApp();
  const { colorBlindMode } = settings;

  return (
    <div
      className={cn(
        styles.tile,
        'font-franklin inline-flex items-center justify-center align-middle text-4xl font-bold uppercase select-none',
        {
          'border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-950': state === 'empty',
          'border-2 border-neutral-400 bg-white text-black': state === 'tbd',
          'dark:border-neutral-600 dark:bg-neutral-950 dark:text-white': state === 'tbd',
          'bg-green-500 text-white dark:bg-green-600': state === 'correct',
          'bg-yellow-500 text-white dark:bg-yellow-600': state === 'present',
          'bg-neutral-500 text-white dark:bg-neutral-700': state === 'absent',
        },
        colorBlindMode && {
          'bg-orange-500!': state === 'correct',
          'bg-blue-400!': state === 'present',
        },
        className,
      )}
      data-letter={letter}
      data-state={state}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
};

export default KeyTile;
