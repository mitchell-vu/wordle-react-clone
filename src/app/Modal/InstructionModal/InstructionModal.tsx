import { BaseModal } from '@/components';
import { useApp } from '@/provider/AppProvider';
import { isIos } from '@/utils/helpers';
import cn from 'classnames';
import * as React from 'react';
import KeyTile from './KeyTile';

const InstructionModal: React.FC = () => {
  const { instructionModalOpen, toggleInstructionModal } = useApp();

  return (
    <BaseModal
      isOpen={instructionModalOpen}
      onClose={toggleInstructionModal}
      title="How To Play"
      subTitle="Guess the Wordle in 6 tries."
      className={cn('mt-10 h-full self-stretch sm:mt-0 sm:h-auto sm:self-center', { 'min-h-screen-mobile': isIos() })}
    >
      <section className="flex flex-col items-stretch">
        <ul className="mb-4 list-disc pl-4 text-sm">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>

        <div>
          <p className="font-bold">Examples</p>
          <div className="mb-5 mt-2">
            <div className="flex flex-row gap-1">
              {'Weary'
                .toUpperCase()
                .split('')
                .map((letter, index) => (
                  <KeyTile key={`${letter}-${index}`} letter={letter} state={index === 0 ? 'correct' : 'tbd'} />
                ))}
            </div>
            <div className="mt-1">
              <b>W</b> is in the word and in the correct spot.
            </div>
          </div>
          <div className="mb-5 mt-2">
            <div className="flex flex-row gap-1">
              {'Pills'
                .toUpperCase()
                .split('')
                .map((letter, index) => (
                  <KeyTile key={`${letter}-${index}`} letter={letter} state={index === 1 ? 'present' : 'tbd'} />
                ))}
            </div>
            <div className="mt-1">
              <b>U</b> is in the word but in the wrong spot.
            </div>
          </div>
          <div className="mb-5 mt-2">
            <div className="flex flex-row gap-1">
              {'Vague'
                .toUpperCase()
                .split('')
                .map((letter, index) => (
                  <KeyTile key={`${letter}-${index}`} letter={letter} state={index === 3 ? 'absent' : 'tbd'} />
                ))}
            </div>
            <div className="mt-1">
              <b>I</b> is not in the word in any spot
            </div>
          </div>
        </div>

        <p>
          A new puzzle is released daily at midnight. If you haven’t already, you can{' '}
          <a
            href="https://www.nytimes.com/newsletters/signup/NTWO"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            sign up
          </a>{' '}
          for our daily reminder email.
        </p>
      </section>
    </BaseModal>
  );
};

export default InstructionModal;
