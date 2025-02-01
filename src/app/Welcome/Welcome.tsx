import WordleIcon from '@/assets/svg/wordle-icon.svg';
import { useApp } from '@/provider/AppProvider';
import { isIos } from '@/utils/helpers';
import { Transition } from '@headlessui/react';
import cn from 'classnames';
import { format } from 'date-fns';
import * as React from 'react';

// const SUB_TITLE = 'Go ahead, add another day to your 1 day streak.';

const Welcome: React.FC = () => {
  const { isPlaying, startPlaying, toggleInstructionModal } = useApp();

  const handleHowToPlay = () => {
    startPlaying();
    toggleInstructionModal();
  };

  return (
    <Transition appear show={!isPlaying} as={React.Fragment}>
      <Transition.Child as={React.Fragment} leave="ease-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div
          className={cn('h-screen bg-[#e3e3e1] font-franklin', {
            'min-h-screen-mobile': isIos(),
          })}
        >
          <div className="flex h-full flex-col items-center justify-center px-10 text-center">
            <img src={WordleIcon} alt="Wordle" className="mb-4 h-16 object-contain" />
            <h1 className="mb-3 font-karnak-condensed text-4xl md:text-5xl lg:text-6xl">Wordle</h1>

            <div className="mb-7 font-karnak text-2xl md:max-w-xs md:text-3xl lg:max-w-sm lg:text-4xl">
              Get 6 chances to guess a <span className="whitespace-nowrap">5-letter</span> word.
            </div>

            <div className="mb-6 flex w-full flex-col-reverse items-center justify-center gap-y-2 md:flex-row md:gap-x-5">
              <button
                onClick={handleHowToPlay}
                className="h-12 w-40 rounded-full border border-black text-black md:w-44"
              >
                How to Play
              </button>
              <button
                onClick={handleHowToPlay}
                className="h-12 w-40 rounded-full border border-black text-black md:w-44"
              >
                Login
              </button>
              <button onClick={startPlaying} className="h-12 w-40 rounded-full bg-black text-white md:w-44">
                Play
              </button>
            </div>

            <div className="text-sm font-semibold">{format(new Date(), 'MMMM d, yyyy')}</div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
  );
};

export default Welcome;
