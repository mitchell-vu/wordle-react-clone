import { createContext } from 'react';

export type TileState = 'tbd' | 'correct' | 'present' | 'absent';

export type GameStatus = 'IN_PROGRESS' | 'WIN' | 'LOSE';

interface GameContextProps {
  boardGuesses: string[];
  evaluations: (TileState[] | null)[];
  keyStatus: Record<string, TileState>;
  gameStatus: GameStatus;
  rowIndex: number;
  solution: string;

  validateGuess: (guess: string) => boolean;
  startNewGame: (newWord: string) => void;
}

const GameContext = createContext<GameContextProps>({
  boardGuesses: ['', '', '', '', '', ''],
  evaluations: [null, null, null, null, null],
  keyStatus: {},
  gameStatus: 'IN_PROGRESS',
  rowIndex: 0,
  solution: '',

  validateGuess: () => true,
  startNewGame: () => {},
});

export default GameContext;
