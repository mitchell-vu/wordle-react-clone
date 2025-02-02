import { cn } from '@/utils/classnames';
import { Transition } from '@headlessui/react';
import * as React from 'react';

type ToastProps = {
  show: boolean;
  message: string;
  className?: string;
};

const Toast: React.FC<ToastProps> = ({ show, message, className }) => {
  return (
    <Transition
      show={show}
      as={React.Fragment}
      leave="ease-in duration-200 transition"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          'pointer-events-none fixed top-14 left-1/2 z-10 max-w-sm -translate-x-1/2 transform select-none',
          'font-franklin line-clamp-1 truncate rounded-sm bg-black px-4 py-3 text-sm font-bold text-white',
          'dark:bg-white dark:text-black',
          className,
        )}
      >
        <p className="text-center">{message}</p>
      </div>
    </Transition>
  );
};

export default Toast;
