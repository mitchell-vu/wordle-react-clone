import { useApp } from '@/hooks';
import { cn } from '@/utils/classnames';
import { isIos } from '@/utils/helpers';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from '@phosphor-icons/react';
import * as React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, subTitle, className }) => {
  const { settings } = useApp();
  const { darkMode } = settings;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className={cn('relative z-10', { dark: darkMode, light: !darkMode })} onClose={onClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/50 dark:bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn('flex h-full items-end justify-center text-center', 'sm:items-center sm:p-4', {
              'min-h-screen-mobile': isIos(),
              'min-h-screen': !isIos(),
            })}
          >
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-200 transform"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-100 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <DialogPanel
                as="div"
                className={cn(
                  'font-franklin max-h-screen w-full max-w-screen overflow-y-auto rounded-lg rounded-b-none border p-8 text-left align-middle',
                  'border-neutral-100 bg-white drop-shadow-2xl transition-all',
                  'sm:max-w-lg sm:rounded-b-lg',
                  'dark:border-neutral-800 dark:bg-neutral-950 dark:text-white',
                  className,
                )}
              >
                <DialogTitle as="header" className="relative mb-4 w-full">
                  {subTitle ? (
                    <div className="flex flex-col gap-1 pt-7">
                      <h2 className="font-karnak-condensed text-3xl font-bold">{title}</h2>
                      <span className="font-karnak text-xl font-medium">{subTitle}</span>
                    </div>
                  ) : (
                    <h2 className="font-karnak-condensed text-center text-2xl font-bold">{title}</h2>
                  )}
                  <button
                    onClick={onClose}
                    className="absolute top-0 right-0 cursor-pointer text-neutral-700 outline-hidden dark:text-neutral-200"
                  >
                    <X size="1.25rem" />
                  </button>
                </DialogTitle>

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
