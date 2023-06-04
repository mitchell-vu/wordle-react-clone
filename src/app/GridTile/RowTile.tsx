import React from 'react';
import KeyTile from './KeyTile';

interface RowTileProps {
  word: string;
  evaluations?: string[];
  tileSize?: number;
  isTbd?: boolean;
}

const RowTile: React.FC<RowTileProps> = ({ word, evaluations, tileSize, isTbd = false }) => {
  const wordArr = word.split('');
  const wordFilledArr = [...wordArr];

  for (let i = wordArr.length; i < 5; i++) {
    wordFilledArr.push('');
  }
  return (
    <div className="game-board__row">
      {wordFilledArr.map((letter, index) => (
        <KeyTile
          key={`${letter}-${index}`}
          letter={letter}
          state={isTbd && letter ? 'tbd' : evaluations?.[index]}
          size={tileSize}
        />
      ))}
    </div>
  );
};

export default RowTile;
