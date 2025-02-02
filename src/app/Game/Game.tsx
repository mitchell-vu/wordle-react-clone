import { GUESS_CHANCES, WORD_LENGTH } from '@/constants/settings';
import { useGame } from '@/hooks';
import { cn } from '@/utils/classnames';
import * as React from 'react';
import styles from './Game.module.css';
import RowTile from './GridTile/RowTile';
import Keyboard from './Keyboard/Keyboard';

const Game: React.FC = () => {
  const { boardGuesses, evaluations, rowIndex, gameStatus, validateGuess } = useGame();

  const boardRef = React.useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = React.useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [currentGuess, setCurrentGuess] = React.useState('');

  React.useEffect(() => {
    const innerHeight = window.innerHeight;
    const boardHeight = innerHeight - 198 - 50;

    const getBoardSize = () => {
      const newHeight = boardRef.current?.clientHeight ?? 0;

      setBoardSize({
        width: (newHeight * WORD_LENGTH) / GUESS_CHANCES,
        height: newHeight,
      });
    };

    setBoardSize({
      width: (boardHeight * WORD_LENGTH) / GUESS_CHANCES,
      height: boardHeight,
    });

    window.addEventListener('resize', getBoardSize);
  }, []);

  const onEnter = () => {
    if (validateGuess(currentGuess)) setCurrentGuess('');
  };

  const onAddChar = (char: string) => {
    if (gameStatus === 'IN_PROGRESS')
      setCurrentGuess((currState) => (currState.length < WORD_LENGTH ? `${currState}${char}` : currState));
  };

  const onDelete = () => {
    if (!currentGuess) return;
    setCurrentGuess((currState) => currState.slice(0, -1));
  };

  const boardData = React.useMemo(() => {
    if (gameStatus !== 'IN_PROGRESS') return boardGuesses;

    const boardData = [...boardGuesses];
    boardData[rowIndex] = currentGuess;

    return boardData;
  }, [boardGuesses, currentGuess, rowIndex, gameStatus]);

  return (
    <main className={cn(styles.game, 'mx-auto flex w-full grow flex-col')}>
      <div className="flex grow items-center justify-center overflow-hidden" ref={boardRef}>
        <div className={cn(styles.board, 'grid grid-rows-6 gap-[5px] p-[10px]')} style={boardSize}>
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
