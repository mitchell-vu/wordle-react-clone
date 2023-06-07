import * as React from 'react';
import { BaseModal } from '../../../components';
import { useApp } from '../../../provider/AppProvider';

const InstructionModal: React.FC = () => {
  const { instructionModalOpen, toggleInstructionModal } = useApp();

  return (
    <BaseModal
      isOpen={instructionModalOpen}
      onClose={toggleInstructionModal}
      title="How To Play"
      subTitle="Guess the Wordle in 6 tries."
    >
      <section className="flex flex-col items-stretch">
        <ul className="mb-4 list-disc pl-4">
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>

        <div>
          <p className="font-bold">Examples</p>
          <div className="mb-5 mt-2">
            <b>W</b> is in the word and in the correct spot.
          </div>
          <div className="mb-5 mt-2">
            <b>U</b> is in the word but in the wrong spot.
          </div>
          <div className="mb-5 mt-2">
            <b>I</b> is not in the word in any spot
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
