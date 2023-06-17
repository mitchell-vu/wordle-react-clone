import { Transition } from '@headlessui/react';
import cn from 'classnames';
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
          'pointer-events-none fixed left-1/2 top-14 z-10 max-w-sm -translate-x-1/2 transform select-none',
          'line-clamp-1 truncate rounded bg-black px-4 py-3 font-franklin text-sm font-bold text-white',
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
