import React from 'react';
import { KeyTile } from './KeyTile';
import './Game.sass';

export const RowTile = ({ word, tileSize }) => {
  const wordArr = [...word];

  return (
    <div className='game-board__row'>
      {(wordArr.length > 0 ? wordArr: new Array(5).fill({ letter: '' })).map(
        (letterObj, index) => {
          return (
            <KeyTile
              key={`${letterObj?.letter}${index}`}
              letter={letterObj?.letter}
              state={letterObj?.state}
              size={tileSize}
            />
          );
        }
      )}
    </div>
  );
};
