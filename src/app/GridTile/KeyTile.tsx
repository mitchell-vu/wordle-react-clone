import React from 'react';

interface KeyTileProps {
  letter?: string;
  state?: string;
  size?: number;
}

const KeyTile: React.FC<KeyTileProps> = ({ letter = '', state = 'empty', size }) => {
  return (
    <div className="game-tile" data-letter={letter} data-state={state} style={{ width: size, height: size }}>
      {letter}
    </div>
  );
};

export default KeyTile;
