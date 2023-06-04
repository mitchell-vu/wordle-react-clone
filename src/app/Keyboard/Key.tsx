import cn from 'classnames';
import * as React from 'react';

interface KeyProps {
  letter?: string;
  className?: string;
  onClick?: (letter: string) => void;
  icon?: React.ReactNode;
  state?: string;
}

const Key: React.FunctionComponent<KeyProps> = ({ letter, className, onClick, icon, state }) => {
  return letter && onClick ? (
    <button className={cn('keyboard__key', className)} onClick={() => onClick(letter)} data-state={state}>
      {icon ?? letter}
    </button>
  ) : (
    <div className={className ?? ''}></div>
  );
};

export default Key;
