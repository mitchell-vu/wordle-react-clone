import * as React from 'react';
import { Modal, Toggle } from '../../components';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FunctionComponent<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="flex flex-col items-stretch">
        <div className="flex flex-row items-center justify-between py-3">
          <div>Hard Mode</div>
          <Toggle enabled={enabled} setEnabled={setEnabled} />
        </div>
        <div className="flex flex-row items-center justify-between py-3">
          <div>Dark Mode</div>
          <Toggle enabled={enabled} setEnabled={setEnabled} />
        </div>

        <div className="py-2 text-xs text-gray-400">© 2023 Mitchell Vu</div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
