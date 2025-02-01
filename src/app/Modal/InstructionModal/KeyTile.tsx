import { useApp } from '@/provider/AppProvider';
import cn from 'classnames';
import * as React from 'react';

interface KeyTileProps {
  letter: string;
  state: 'tbd' | 'correct' | 'present' | 'absent';
}

const KeyTile: React.FunctionComponent<KeyTileProps> = ({ letter, state }) => {
  const { settings } = useApp();
  const { colorBlindMode } = settings;

  return (
    <div
      className={cn(
        'inline-flex h-8 w-8 select-none items-center justify-center align-middle text-2xl font-bold uppercase',
        {
          'border-2 border-neutral-400 bg-white text-black': state === 'tbd',
          'dark:border-neutral-600 dark:bg-neutral-950 dark:text-white': state === 'tbd',
          'bg-green-500  text-white dark:bg-green-600': state === 'correct',
          'bg-yellow-500  text-white dark:bg-yellow-600': state === 'present',
          'bg-neutral-500  text-white dark:bg-neutral-700': state === 'absent',
          'bg-orange-500!': colorBlindMode && state === 'correct',
          'bg-blue-400!': colorBlindMode && state === 'present',
        },
      )}
    >
      {letter}
    </div>
  );
};

export default KeyTile;
