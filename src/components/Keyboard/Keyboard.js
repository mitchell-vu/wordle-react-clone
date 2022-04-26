import React, { useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { GameContext } from '../../context/game-context';
import './Keyboard.sass';

export const Key = ({ letter, className, onClick, icon, state }) => {
  return letter ? (
    <button
      className={`keyboard__key ${className ?? ''}`}
      onClick={() => onClick(letter)}
      data-state={state}
    >
      {icon ?? letter}
    </button>
  ) : (
    <div className={className ?? ''}></div>
  );
};

export const Keyboard = ({ onAddChar, onEnter, onDelete }) => {
  const { keyStatus } = useContext(GameContext);

  const onClick = (value) => {
    if (value === 'Enter') {
      onEnter();
    } else if (value === 'Backspace') {
      onDelete();
    } else {
      const key = value.toUpperCase();

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        onAddChar(key);
      }
    }
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onDelete();
      } else {
        const key = e.key.toUpperCase();

        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onAddChar(key);
        }
      }
    };

    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onEnter, onDelete, onAddChar]);

  return (
    <div className='keyboard'>
      <div className='keyboard__row'>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(
          (key, index) => {
            return (
              <Key
                key={index}
                letter={key}
                state={keyStatus[key]}
                onClick={onClick}
                className='fade'
              />
            );
          },
        )}
      </div>
      <div className='keyboard__row'>
        <Key className='half' />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key, index) => {
          return (
            <Key
              key={index}
              letter={key}
              state={keyStatus[key]}
              onClick={onClick}
            />
          );
        })}
        <Key className='half' />
      </div>
      <div className='keyboard__row'>
        <Key letter={'Enter'} onClick={onClick} className='one-and-a-half' />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key, index) => {
          return (
            <Key
              key={index}
              letter={key}
              state={keyStatus[key]}
              onClick={onClick}
            />
          );
        })}
        <Key
          letter={'Backspace'}
          icon={<Icon icon='ic:outline-backspace' width='24' height='24' />}
          onClick={onClick}
          className='one-and-a-half'
        />
      </div>
    </div>
  );
};
