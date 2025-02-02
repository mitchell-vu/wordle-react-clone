import { Modal, Toggle } from '@/components';
import { AppSettingsProps } from '@/constants/config';
import { useApp } from '@/hooks';
import * as React from 'react';

const SETTINGS = [
  {
    title: 'Hard Mode',
    setting: 'hardMode',
    description: 'Any revealed hints must be used in subsequent guesses',
  },
  {
    title: 'Dark Theme',
    setting: 'darkMode',
  },
  {
    title: 'High Contrast Mode',
    setting: 'colorBlindMode',
    description: 'For improved color vision',
  },
];

const SettingsModal: React.FC = () => {
  const { settings, toggleSettings, settingsModalOpen, toggleSettingsModal } = useApp();

  return (
    <Modal
      isOpen={settingsModalOpen}
      onClose={toggleSettingsModal}
      title="Settings"
      className="flex h-4/6 flex-col sm:h-auto"
    >
      <div className="flex grow flex-col justify-between">
        <div className="flex flex-col items-stretch">
          {SETTINGS.map((setting, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-3 border-b py-4 transition-[border] dark:border-neutral-800"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-lg">{setting.title}</h3>
                {setting.description && <div className="text-xs text-neutral-400">{setting.description}</div>}
              </div>
              <Toggle
                enabled={settings[setting.setting as keyof AppSettingsProps]}
                setEnabled={() => toggleSettings(setting.setting as keyof AppSettingsProps)}
              />
            </div>
          ))}
        </div>

        <div className="py-3 text-xs text-neutral-400">© 2023 Mitchell Vu</div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
