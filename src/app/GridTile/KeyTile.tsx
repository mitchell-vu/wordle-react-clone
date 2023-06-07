import classNames from 'classnames';
import React from 'react';
import styles from './KeyTile.module.sass';

interface KeyTileProps {
  letter?: string;
  state?: string;
  size?: number;
}

const KeyTile: React.FC<KeyTileProps> = ({ letter = '', state = 'empty', size }) => {
  return (
    <div
      className={classNames(
        styles.tile,
        'inline-flex select-none items-center justify-center align-middle text-3xl font-bold uppercase',
      )}
      data-letter={letter}
      data-state={state}
      style={{ width: size, height: size }}
    >
      {letter}
    </div>
  );
};

export default KeyTile;
