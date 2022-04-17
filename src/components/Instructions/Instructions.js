import React from 'react';
import { RowTile } from '../Game/RowTile';

const Example = ({ instruction }) => {
  return (
    <div className='instructions__example'>
      <RowTile
        word={[
          { letter: 'a', state: 'correct' },
          { letter: 'p', state: 'absent' },
          { letter: 'p', state: 'correct' },
          { letter: 'l', state: 'correct' },
          { letter: 'e', state: 'correct' },
        ]}
        tileSize={40}
      />
      <p>{instruction}</p>
    </div>
  );
};

export const Instructions = () => {
  return (
    <section>
      <div className='instructions'>
        <p>
          Guess the <strong>WORDLE</strong> in six tries.
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <div className='examples'>
          <p>
            <strong>Examples</strong>
          </p>
          <Example
            instruction={
              <>
                The letter <strong>W</strong> is in the word and in the correct
                spot.
              </>
            }
          />
          <Example
            instruction={
              <>
                The letter <strong>I</strong> is in the word but in the wrong
                spot.
              </>
            }
          />
          <Example
            instruction={
              <>
                The letter <strong>U</strong> is not in the word in any spot.
              </>
            }
          />
        </div>
        <p>
          <strong>A new WORDLE will be available each day!</strong>
        </p>
      </div>
    </section>
  );
};
