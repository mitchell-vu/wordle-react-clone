import { useApp } from '@/provider/AppProvider';
import { isIos } from '@/utils/helpers';
import { Dialog, Transition } from '@headlessui/react';
import { X } from '@phosphor-icons/react';
import cn from 'classnames';
import * as React from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children, title, subTitle, className }) => {
  const { settings } = useApp();
  const { darkMode } = settings;

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className={cn('relative z-10', { dark: darkMode, light: !darkMode })} onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={cn('flex h-full items-end justify-center text-center', 'sm:items-center sm:p-4', {
              'min-h-screen-mobile': isIos(),
              'min-h-screen': !isIos(),
            })}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-200 transform"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-100 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel
                as="div"
                className={cn(
                  'max-w-screen max-h-screen w-full overflow-y-auto rounded-lg rounded-b-none border p-8 text-left align-middle font-franklin',
                  'border-neutral-100 bg-white drop-shadow-2xl transition-all',
                  'sm:max-w-lg sm:rounded-b-lg',
                  'dark:border-neutral-800 dark:bg-neutral-950 dark:text-white',
                  className,
                )}
              >
                <Dialog.Title as="header" className="relative mb-4 w-full">
                  {subTitle ? (
                    <div className="flex flex-col gap-1 pt-7">
                      <h2 className="font-karnak-condensed text-3xl font-bold">{title}</h2>
                      <span className="font-karnak text-xl font-medium">{subTitle}</span>
                    </div>
                  ) : (
                    <h2 className="text-center font-karnak-condensed text-2xl font-bold">{title}</h2>
                  )}
                  <button
                    onClick={onClose}
                    className="absolute right-0 top-0 text-neutral-700 outline-none dark:text-neutral-200"
                  >
                    <X size="1.25rem" />
                  </button>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BaseModal;
