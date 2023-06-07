import moment from 'moment';
import * as React from 'react';
import WordleIcon from '../../assets/svg/wordle-icon.svg';
import { useApp } from '../../provider/AppProvider';

// const SUB_TITLE = 'Go ahead, add another day to your 1 day streak.';

const Welcome: React.FC = () => {
  const { startPlaying, toggleInstructionModal } = useApp();

  const handleHowToPlay = () => {
    startPlaying();
    toggleInstructionModal();
  };

  return (
    <div className="h-screen bg-[#e3e3e1] font-franklin">
      <div className="flex h-full flex-col items-center justify-center px-10 text-center">
        <img src={WordleIcon} alt="Wordle" className="mb-4 h-16 object-contain" />
        <h1 className="font-karnak-condensed text-4xl">Wordle</h1>

        <div className="mb-7 text-2xl">
          Get 6 chances to guess a <span className="whitespace-nowrap">5-letter</span> word.
        </div>

        <div className="mb-6 flex w-full flex-col items-center justify-center gap-2">
          <button onClick={startPlaying} className="h-12 w-36 rounded-full bg-black text-white">
            Play
          </button>
          <button onClick={handleHowToPlay} className="h-12 w-36 rounded-full border border-black text-black">
            How to Play
          </button>
        </div>

        <div className="font-bold">{moment().format('MMMM D, YYYY')}</div>
      </div>
    </div>
  );
};

export default Welcome;
