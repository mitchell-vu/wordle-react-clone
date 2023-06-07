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
    <div className="grid grid-cols-5 gap-1">
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
