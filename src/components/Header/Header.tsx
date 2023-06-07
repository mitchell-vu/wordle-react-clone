import * as React from 'react';
import { LuSettings } from 'react-icons/lu';
import { useApp } from '../../provider/AppProvider';

const Header: React.FC = () => {
  const { toggleSettingsModal } = useApp();

  return (
    <header className="flex h-[50px] flex-row flex-nowrap items-center justify-between border-b px-4">
      <div></div>
      <div className="font-karnak text-4xl font-bold">Wordle</div>
      <div className="flex flex-row items-center">
        <button onClick={toggleSettingsModal}>
          <LuSettings size="1.5rem" />
        </button>
      </div>
    </header>
  );
};

export default Header;
