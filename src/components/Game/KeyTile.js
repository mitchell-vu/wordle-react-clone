import React from 'react';
import './Game.sass';

export const KeyTile = ({ letter = '', state = 'empty', size }) => {
  return (
    <div
      className='game-tile'
      letter={letter}
      data-state={state}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
};
