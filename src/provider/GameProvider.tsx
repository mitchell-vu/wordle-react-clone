import { guessValidator } from '@/utils/validator';
import { FixMeLater } from '@/vite-env';
import { createContext, useContext, useEffect, useState } from 'react';

interface GameContextProps {
  boardState: string[];
  evaluations: FixMeLater[];
  keyStatus: FixMeLater;
  gameStatus: 'IN_PROGRESS' | 'WIN' | 'LOSE';
  hardMode: boolean;
  rowIndex: number;
  solution: string;
  enterHandler: (guess: string) => boolean;
}

export const GameContext = createContext<GameContextProps>({
  boardState: ['', '', '', '', '', ''],
  evaluations: [''],
  keyStatus: {},
  gameStatus: 'IN_PROGRESS',
  hardMode: false,
  rowIndex: 0,
  solution: '',
  enterHandler: () => true,
});

interface GameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [boardState, setBoardState] = useState(['', '', '', '', '', '']);
  const [evaluations, setEvaluations] = useState<FixMeLater[]>([null, null, null, null, null]);
  const [keyStatus, setKeyStatus] = useState<FixMeLater>({});
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WIN' | 'LOSE'>('IN_PROGRESS'); // WIN, LOSE
  const [hardMode, setHardMode] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [solution, setSolution] = useState('');

  useEffect(() => {
    setGameStatus('IN_PROGRESS');
    setHardMode(false);
    setSolution('tommy');
  }, []);

  useEffect(() => {
    if (gameStatus === 'WIN') {
      switch (rowIndex) {
        case 0:
          alert('Genius');
          break;
        case 1:
          alert('Magnificent');
          break;
        case 2:
          alert('Impressive');
          break;
        case 3:
          alert('Splendid');
          break;
        case 4:
          alert('Great');
          break;
        case 5:
          alert('Phew');
          break;
      }
    } else if (gameStatus === 'LOSE') {
      alert(`${solution.toUpperCase()}`);
    }
  }, [gameStatus, rowIndex, solution]);

  const enterHandler = (guess: string) => {
    // Is game in progress
    if (gameStatus !== 'IN_PROGRESS') return true;

    // Validate
    const validation = guessValidator(guess, solution.length);

    if (!validation?.valid) {
      alert(validation.message);
      return false;
    }

    // Evaluate
    // -> array of 5 key states
    const solutionArr: FixMeLater[] = solution.split('').map((letter) => letter.toUpperCase());
    const evaluationArr: FixMeLater[] = [];
    const keyEvaluation: FixMeLater = {};

    // Check if is correct answer
    if (guess === solution.toUpperCase()) {
      evaluationArr.push('correct', 'correct', 'correct', 'correct', 'correct');
      guess.split('').forEach((key) => {
        keyEvaluation[key] = 'correct';
      });
      setGameStatus('WIN');
    } else {
      // Check for correct keys
      for (let i = 0; i < solutionArr.length; i++) {
        const guessKey = guess[i];

        if (solutionArr[i] === guessKey) {
          evaluationArr[i] = 'correct';
          keyEvaluation[guessKey] = 'correct';
          solutionArr[i] = null;
        }
      }

      for (let i = 0; i < solutionArr.length; i++) {
        const guessKey = guess[i];

        if (evaluationArr[i]) continue;
        const index = solutionArr.findIndex((key) => key === guessKey);

        // Có chữ đáy ở trong solution
        if (index >= 0) {
          evaluationArr[i] = 'present';
          if (!keyStatus[guessKey]) {
            keyStatus[guessKey] = 'present';
          }
          solutionArr[index] = null;
        }
        // Không có chữ đáy ở trong solution
        else {
          evaluationArr[i] = 'absent';
          keyStatus[guessKey] = 'absent';
        }
      }
    }

    // Set state
    setBoardState((currState) => {
      const board = [...currState];

      board.splice(rowIndex, 1, guess);
      return board;
    });
    setEvaluations((currState) => {
      const evaluation = [...currState];

      evaluation.splice(rowIndex, 1, evaluationArr);
      return evaluation;
    });
    setKeyStatus((currState: FixMeLater) => ({ ...currState, ...keyEvaluation }));

    // Update row index
    if (rowIndex === 5) {
      setGameStatus('LOSE');
    } else {
      setRowIndex((currRow) => currRow + 1);
    }

    return true;
  };

  return (
    <GameContext.Provider
      value={{
        boardState,
        evaluations,
        keyStatus,
        gameStatus,
        hardMode,
        rowIndex,
        solution,
        enterHandler,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => useContext(GameContext);
