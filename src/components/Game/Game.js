import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const boardRef = useRef();
  const [boardSize, setBoardSize] = useState({});

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

  const getBoardSize = () => {
    const newHeight = boardRef.current.clientHeight;
    
    setBoardSize({
      width: newHeight * 5 / 6,
      height: newHeight,
    });
  };

  useEffect(() => {
    const innerHeight = window.innerHeight;
    const boardHeight = innerHeight - 198 - 50;

    setBoardSize({
      width: boardHeight * 5 / 6,
      height: boardHeight,
    });
    window.addEventListener("resize", getBoardSize);
  }, []);

  return (
    <div className='game'>
      <div className='game-board__container' ref={boardRef}>
        <div className='game-board' style={boardSize}>
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
