import { FixMeLater } from '@/vite-env';
import { createContext } from 'react';

interface GameContextProps {
  boardState: string[];
  evaluations: FixMeLater[];
  keyStatus: FixMeLater;
  gameStatus: 'IN_PROGRESS' | 'WIN' | 'LOSE';
  rowIndex: number;
  solution: string;
  enterHandler: (guess: string) => boolean;
}

const GameContext = createContext<GameContextProps>({
  boardState: ['', '', '', '', '', ''],
  evaluations: [''],
  keyStatus: {},
  gameStatus: 'IN_PROGRESS',
  rowIndex: 0,
  solution: '',
  enterHandler: () => true,
});

GameContext.displayName = 'GameContext';

export default GameContext;
