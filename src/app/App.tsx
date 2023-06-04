import * as React from 'react';
import Header from '../components/Header/Header';
import { GameContext } from '../provider/GameProvider';
import RowTile from './GridTile/RowTile';
import Keyboard from './Keyboard/Keyboard';

import './App.sass';

const App: React.FC = () => {
  const { boardState, evaluations, rowIndex, gameStatus, enterHandler } = React.useContext(GameContext);
  const [currentGuess, setCurrentGuess] = React.useState('');
  const boardArr = [...boardState];
  const boardRef = React.useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = React.useState({});

  const onEnter = () => {
    const isReset = enterHandler(currentGuess);

    if (isReset) setCurrentGuess('');
  };

  const onAddChar = (char: string) => {
    if (gameStatus === 'IN_PROGRESS') {
      setCurrentGuess((currState) => (currState.length < 5 ? `${currState}${char}` : currState));
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
    const newHeight = boardRef.current?.clientHeight ?? 0;

    setBoardSize({
      width: (newHeight * 5) / 6,
      height: newHeight,
    });
  };

  React.useEffect(() => {
    const innerHeight = window.innerHeight;
    const boardHeight = innerHeight - 198 - 50;

    setBoardSize({
      width: (boardHeight * 5) / 6,
      height: boardHeight,
    });
    window.addEventListener('resize', getBoardSize);
  }, []);

  return (
    <>
      <Header />
      <div className="game">
        <div className="game-board__container" ref={boardRef}>
          <div className="game-board" style={boardSize}>
            {boardArr.map((rowWord, rowNum) => {
              return (
                <RowTile
                  key={rowNum}
                  word={rowWord}
                  evaluations={evaluations[rowNum]}
                  // rowIndex={rowIndex}
                  isTbd={rowNum === rowIndex && gameStatus === 'IN_PROGRESS'}
                  // tileSize={24}
                />
              );
            })}
          </div>
        </div>
        <Keyboard onAddChar={onAddChar} onDelete={onDelete} onEnter={onEnter} />
      </div>
    </>
  );
};

export default App;
