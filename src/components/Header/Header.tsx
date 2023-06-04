import * as React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex h-[50px] flex-row flex-nowrap items-center justify-between border-b px-4">
      <div></div>
      <div className="font-karnak text-4xl font-bold">Wordle</div>
      <div></div>
    </header>
  );
};

export default Header;
