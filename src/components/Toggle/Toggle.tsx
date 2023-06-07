import { Switch } from '@headlessui/react';
import cn from 'classnames';
import * as React from 'react';

interface ToggleProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  name?: string;
}

const Toggle: React.FunctionComponent<ToggleProps> = ({ enabled, setEnabled, name }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        'relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
        { 'bg-gray-500': !enabled, 'bg-green-600': enabled },
      )}
    >
      <span className="sr-only">{name}</span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out',
          { 'translate-x-0': !enabled, 'translate-x-4': enabled },
        )}
      />
    </Switch>
  );
};

export default Toggle;
