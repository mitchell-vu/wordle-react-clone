import React from 'react';
import { RowKey } from './RowKey';
import './Keyboard.sass';

export const Keyboard = () => {
  const qwertKeyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
    ['↵', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'],
  ];

  return (
    <div className='keyboard'>
      {qwertKeyboard.map((row, index) => (
        <RowKey key={`kb-${index}`} keys={row} />
      ))}
    </div>
  );
};
