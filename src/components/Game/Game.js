import React from 'react';
import { Keyboard } from '../Keyboard/Keyboard';
import { RowTile } from './RowTile';

export const Game = ({ gameData }) => {
  return (
    <div className='game'>
      <div className='game-board__container'>
        <div className='game-board' style={{ width: 70 * 5, height: 70 * 6 }}>
          {gameData.map((rowWord, rowNum) => {
            return <RowTile key={rowNum} word={rowWord} />;
          })}
        </div>
      </div>
      <Keyboard />
    </div>
  );
};
