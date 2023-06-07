import cn from 'classnames';
import * as React from 'react';

interface KeyProps {
  letter?: string;
  className?: string;
  onClick?: (letter: string) => void;
  icon?: React.ReactNode;
  state?: string;
}

const Key: React.FC<KeyProps> = ({ letter, className, onClick, icon, state }) => {
  return letter && onClick ? (
    <button
      className={cn(
        'keyboard__key',
        'flex items-center justify-center font-bold uppercase text-black',
        'select-none rounded border-0 p-0 outline-0 last-of-type:m-0',
        className,
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
