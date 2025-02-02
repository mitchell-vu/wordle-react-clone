import { KeyTile } from '@/components';
import { TileState } from '@/contexts/GameContext';
import React, { useMemo } from 'react';

interface RowTileProps {
  word: string;
  evaluations: TileState[] | null;
  tileSize?: number;
  isTbd?: boolean;
}

const RowTile: React.FC<RowTileProps> = ({ word, evaluations, tileSize, isTbd = false }) => {
  const wordFilledArr = useMemo(() => {
    const wordArr = word.split('');

    return [...wordArr, ...Array.from({ length: 5 - wordArr.length }).map(() => '')];
  }, [word]);

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
