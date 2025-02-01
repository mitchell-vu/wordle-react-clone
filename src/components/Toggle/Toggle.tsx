import { useApp } from '@/provider/AppProvider';
import { Switch } from '@headlessui/react';
import cn from 'classnames';
import * as React from 'react';

interface ToggleProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  name?: string;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, setEnabled, name }) => {
  const { settings } = useApp();
  const { colorBlindMode } = settings;

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        'relative inline-flex h-5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
        {
          'bg-neutral-500 dark:bg-neutral-600': !enabled,
          'bg-green-500 dark:bg-green-600': enabled,
          'bg-orange-500!': enabled && colorBlindMode,
        },
      )}
    >
      <span className="sr-only">{name}</span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out',
          { 'translate-x-0': !enabled, 'translate-x-3': enabled },
        )}
      />
    </Switch>
  );
};

export default Toggle;
