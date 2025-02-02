import { KeyTile, Modal } from '@/components';
import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import { isIos } from '@/utils/helpers';
import * as React from 'react';

const InstructionModal: React.FC = () => {
  const { instructionModalOpen, toggleInstructionModal } = useApp();

  return (
    <Modal
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

        <div className="flex flex-col">
          <p className="font-bold">Examples</p>

          {[
            {
              word: 'wordy',
              keyLetter: {
                index: 0,
                state: 'correct',
                instruction: 'is in the word and in the correct spot.',
              },
            },
            {
              word: 'light',
              keyLetter: {
                index: 1,
                state: 'present',
                instruction: 'is in the word but in the wrong spot.',
              },
            },
            {
              word: 'rogue',
              keyLetter: {
                index: 3,
                state: 'absent',
                instruction: 'is not in the word in any spot.',
              },
            },
          ].map(({ word, keyLetter }) => (
            <div key={word} className="mt-2 mb-5">
              <div className="flex flex-row gap-1">
                {word
                  .toUpperCase()
                  .split('')
                  .map((letter, index) => (
                    <KeyTile
                      key={`${letter}-${index}`}
                      letter={letter}
                      state={index === keyLetter.index ? keyLetter.state : 'tbd'}
                      size={32}
                      className="text-2xl"
                    />
                  ))}
              </div>
              <div className="mt-1">
                <b className="uppercase">{word[keyLetter.index]}</b> {keyLetter.instruction}
              </div>
            </div>
          ))}
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
    </Modal>
  );
};

export default InstructionModal;
