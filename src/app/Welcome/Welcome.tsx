import WordleIcon from '@/assets/svg/wordle-icon.svg';
import { Button } from '@/components';
import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import { isIos } from '@/utils/helpers';
import { Transition, TransitionChild } from '@headlessui/react';
import { format } from 'date-fns';
import * as React from 'react';

const Welcome: React.FC = () => {
  const { isPlaying, startPlaying, toggleInstructionModal } = useApp();

  const handleHowToPlay = () => {
    startPlaying();
    toggleInstructionModal();
  };

  return (
    <Transition appear show={!isPlaying} as={React.Fragment}>
      <TransitionChild as={React.Fragment} leave="ease-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
        <div
          className={cn('font-franklin h-screen bg-[#e3e3e1]', {
            'min-h-screen-mobile': isIos(),
          })}
        >
          <div className="flex h-full flex-col items-center justify-center px-10 text-center">
            <img src={WordleIcon} alt="Wordle" className="mb-4 h-16 object-contain" />
            <h1 className="font-karnak-condensed mb-3 text-4xl md:text-5xl lg:text-6xl">Wordle</h1>

            <div className="font-karnak mb-7 text-2xl md:max-w-xs md:text-3xl lg:max-w-sm lg:text-4xl">
              Get 6 chances to guess a <span className="whitespace-nowrap">5-letter</span> word.
            </div>

            <div className="mb-6 flex w-full flex-col-reverse items-center justify-center gap-y-2 md:flex-row md:gap-x-5">
              <Button size="lg" className="border border-black! bg-transparent! text-black!" onClick={handleHowToPlay}>
                How to Play
              </Button>

              {/* <Button size="lg" className="border border-black! bg-transparent! text-black!">
                Login
              </Button> */}

              <Button size="lg" className="bg-black! text-white!" onClick={startPlaying}>
                Play
              </Button>
            </div>

            <div className="text-sm font-semibold">{format(new Date(), 'MMMM d, yyyy')}</div>
          </div>
        </div>
      </TransitionChild>
    </Transition>
  );
};

export default Welcome;
