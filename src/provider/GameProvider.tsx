import { GUESS_CHANCES } from '@/constants/settings';
import WORDS from '@/constants/word-list.json';
import GameContext from '@/contexts/GameContext';
import { guessValidator } from '@/utils/validator';
import { FixMeLater } from '@/vite-env';
import { useContext, useEffect, useState } from 'react';
import { useToast } from './ToastProvider';

interface GameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { addToast } = useToast();
  const [boardState, setBoardState] = useState(['', '', '', '', '', '']);
  const [evaluations, setEvaluations] = useState<FixMeLater[]>([null, null, null, null, null]);
  const [keyStatus, setKeyStatus] = useState<FixMeLater>({});
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WIN' | 'LOSE'>('IN_PROGRESS');
  const [rowIndex, setRowIndex] = useState(0);
  const [solution, setSolution] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);

    setGameStatus('IN_PROGRESS');
    setSolution(WORDS[randomIndex] as string);
  }, []);

  useEffect(() => {
    let message = '';

    if (gameStatus === 'WIN') {
      switch (rowIndex) {
        case 0:
          message = 'Genius';
          break;
        case 1:
          message = 'Magnificent';
          break;
        case 2:
          message = 'Impressive';
          break;
        case 3:
          message = 'Splendid';
          break;
        case 4:
          message = 'Great';
          break;
        case 5:
          message = 'Phew';
          break;
      }
    } else if (gameStatus === 'LOSE') {
      message = solution.toUpperCase();
    }

    if (message) {
      addToast(message, { persist: true });
    }
  }, [gameStatus, rowIndex, solution, addToast]);

  const enterHandler = (guess: string) => {
    // Is game in progress
    if (gameStatus !== 'IN_PROGRESS') return false;

    // Validate
    const { valid, message } = guessValidator(guess, solution.length);

    if (!valid) {
      if (message) addToast(message);

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
    setRowIndex((currRow) => currRow + 1);
    if (rowIndex === GUESS_CHANCES - 1) setGameStatus('LOSE');

    return true;
  };

  return (
    <GameContext.Provider
      value={{
        boardState,
        evaluations,
        keyStatus,
        gameStatus,
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
