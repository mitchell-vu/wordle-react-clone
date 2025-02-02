import { GUESS_CHANCES } from '@/constants/settings';
import GameContext, { TileState } from '@/contexts/GameContext';
import { useToast } from '@/hooks';
import { guessValidator } from '@/utils/validator';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface GameProviderProps {
  children: React.ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { addToast } = useToast();

  const [boardGuesses, setboardGuesses] = useState(['', '', '', '', '', '']);
  const [evaluations, setEvaluations] = useState<(TileState[] | null)[]>([null, null, null, null, null]);
  const [keyStatus, setKeyStatus] = useState<Record<string, TileState>>({});
  const [gameStatus, setGameStatus] = useState<'IN_PROGRESS' | 'WIN' | 'LOSE'>('IN_PROGRESS');
  const [rowIndex, setRowIndex] = useState(0);
  const [solution, setSolution] = useState('');

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

  const handleValidateGuess = useCallback(
    (guess: string) => {
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
      const solutionArr: (string | null)[] = solution.split('').map((letter) => letter.toUpperCase());
      const evaluationArr: TileState[] = [];
      const keyEvaluation: Record<string, TileState> = {};

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
      setboardGuesses((currState) => {
        const board = [...currState];

        board.splice(rowIndex, 1, guess);
        return board;
      });
      setEvaluations((currState) => {
        const evaluation = [...currState];

        evaluation.splice(rowIndex, 1, evaluationArr);
        return evaluation;
      });
      setKeyStatus((currState) => ({ ...currState, ...keyEvaluation }));

      // Update row index
      setRowIndex((currRow) => currRow + 1);
      if (rowIndex === GUESS_CHANCES - 1) setGameStatus('LOSE');

      return true;
    },
    [gameStatus, rowIndex, solution, addToast, keyStatus],
  );

  const handleSetNewGame = useCallback((newWord: string) => {
    setGameStatus('IN_PROGRESS');
    setSolution(newWord);
  }, []);

  const contextValue = useMemo(
    () => ({
      boardGuesses,
      evaluations,
      keyStatus,
      gameStatus,
      rowIndex,
      solution,

      validateGuess: handleValidateGuess,
      startNewGame: handleSetNewGame,
    }),
    [boardGuesses, evaluations, keyStatus, gameStatus, rowIndex, solution, handleValidateGuess, handleSetNewGame],
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export default GameProvider;
