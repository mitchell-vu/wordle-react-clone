import { BaseModal, Toggle } from '@/components';
import { useApp } from '@/provider/AppProvider';
import * as React from 'react';

const SETTINGS = [
  {
    title: 'Hard Mode',
    description: 'Any revealed hints must be used in subsequent guesses',
  },
  {
    title: 'Dark Theme',
  },
  {
    title: 'High Contrast Mode',
    description: 'For improved color vision',
  },
];

const SettingsModal: React.FC = () => {
  const { settingsModalOpen, toggleSettingsModal } = useApp();
  const [enabled, setEnabled] = React.useState(false);

  return (
    <BaseModal isOpen={settingsModalOpen} onClose={toggleSettingsModal} title="Settings">
      <div className="flex flex-col items-stretch">
        {SETTINGS.map((setting, index) => (
          <div key={index} className="flex flex-row items-center justify-between border-b py-4 dark:border-neutral-800">
            <div className="flex flex-col items-start">
              <h3 className="text-lg">{setting.title}</h3>
              {setting.description && <div className="text-xs text-neutral-400">{setting.description}</div>}
            </div>
            <Toggle enabled={enabled} setEnabled={setEnabled} />
          </div>
        ))}

        <div className="py-3 text-xs text-neutral-400">© 2023 Mitchell Vu</div>
      </div>
    </BaseModal>
  );
};

export default SettingsModal;
