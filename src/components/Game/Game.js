import React, { useContext, useState } from 'react';
import { Keyboard } from '../Keyboard/Keyboard';
import { RowTile } from './RowTile';
import { GameContext } from '../../context/game-context';

export const Game = () => {
  const {
    boardState,
    evaluations,
    rowIndex,
    gameStatus,
    enterHandler,
  } = useContext(GameContext);
  const [currentGuess, setCurrentGuess] = useState('');
  const boardArr = [...boardState];

  const onEnter = () => {
    const isReset = enterHandler(currentGuess);

    if (isReset) setCurrentGuess('');
  };

  const onAddChar = (char) => {
    if (gameStatus === 'IN_PROGRESS') {
      setCurrentGuess((currState) =>
        currState.length < 5 ? `${currState}${char}` : currState,
      );
    }
  };

  const onDelete = () => {
    if (!currentGuess) return;
    setCurrentGuess((currState) => currState.slice(0, -1));
  };

  if (gameStatus === 'IN_PROGRESS') {
    boardArr[rowIndex] = currentGuess;
  }

  return (
    <div className='game'>
      <div className='game-board__container'>
        <div className='game-board' style={{ width: 70 * 5, height: 70 * 6 }}>
          {boardArr.map((rowWord, rowNum) => {
            return (
              <RowTile
                key={rowNum}
                word={rowWord}
                evaluations={evaluations[rowNum]}
                rowIndex={rowIndex}
                isTbd={rowNum === rowIndex && gameStatus === 'IN_PROGRESS'}
              />
            );
          })}
        </div>
      </div>
      <Keyboard
        onAddChar={onAddChar}
        onDelete={onDelete}
        onEnter={onEnter}
      />
    </div>
  );
};
