import cn from 'classnames';
import * as React from 'react';
import { useGame } from '../../provider/GameProvider';
import RowTile from '../GridTile/RowTile';
import Keyboard from '../Keyboard/Keyboard';
import styles from './Game.module.sass';

const Game: React.FC = () => {
  const { boardState, evaluations, rowIndex, gameStatus, enterHandler } = useGame();
  const [currentGuess, setCurrentGuess] = React.useState('');
  const boardRef = React.useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = React.useState({});

  React.useEffect(() => {
    const innerHeight = window.innerHeight;
    const boardHeight = innerHeight - 198 - 50;

    const getBoardSize = () => {
      const newHeight = boardRef.current?.clientHeight ?? 0;

      setBoardSize({
        width: (newHeight * 5) / 6,
        height: newHeight,
      });
    };

    setBoardSize({
      width: (boardHeight * 5) / 6,
      height: boardHeight,
    });

    window.addEventListener('resize', getBoardSize);
  }, []);

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
    boardState[rowIndex] = currentGuess;
  }

  const boardData = React.useMemo(() => {
    const boardData = [...boardState];
    boardData[rowIndex] = currentGuess;

    return boardData;
  }, [boardState, currentGuess, rowIndex]);

  return (
    <main className={cn(styles.game, 'mx-auto flex w-full grow flex-col')}>
      <div className="flex grow items-center justify-center overflow-hidden" ref={boardRef}>
        <div className={styles.board} style={boardSize}>
          {boardData.map((rowWord, rowNum) => {
            return (
              <RowTile
                key={rowNum}
                word={rowWord}
                evaluations={evaluations[rowNum]}
                isTbd={rowNum === rowIndex && gameStatus === 'IN_PROGRESS'}
              />
            );
          })}
        </div>
      </div>

      <Keyboard onAddChar={onAddChar} onDelete={onDelete} onEnter={onEnter} />
    </main>
  );
};

export default Game;