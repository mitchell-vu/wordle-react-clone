import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import React from 'react';
import styles from './KeyTile.module.css';

interface KeyTileProps {
  letter?: string;
  state?: string;
  size?: number;
}

const KeyTile: React.FC<KeyTileProps> = ({ letter = '', state = 'empty', size }) => {
  const { settings } = useApp();
  const { colorBlindMode } = settings;

  return (
    <div
      className={cn(
        styles.tile,
        'inline-flex select-none items-center justify-center align-middle text-4xl font-bold uppercase',
        {
          'border-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-950': state === 'empty',
          'border-2 border-neutral-400 bg-white text-black': state === 'tbd',
          'dark:border-neutral-600 dark:bg-neutral-950 dark:text-white': state === 'tbd',
          'bg-green-500  text-white dark:bg-green-600': state === 'correct',
          'bg-yellow-500  text-white dark:bg-yellow-600': state === 'present',
          'bg-neutral-500  text-white dark:bg-neutral-700': state === 'absent',
          'bg-orange-500!': colorBlindMode && state === 'correct',
          'bg-blue-400!': colorBlindMode && state === 'present',
        },
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
