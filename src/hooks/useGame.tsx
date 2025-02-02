import GameContext from '@/contexts/GameContext';
import * as React from 'react';

const useGame = () => React.useContext(GameContext);

export default useGame;
