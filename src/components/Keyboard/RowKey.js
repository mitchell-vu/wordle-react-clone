import React from 'react';
import './Keyboard.sass';

export const RowKey = ({ keys }) => {
  return (
    <div className='keyboard__row'>
      {keys.map((key, index) => {
        // console.log(key);
        return key ? (
          <button key={`kb-${key}`} className='keyboard__key'>
            {key}
          </button>
        ) : (
          <div key={`kb-${index}`} className='half'></div>
        );
      })}
    </div>
  );
};
