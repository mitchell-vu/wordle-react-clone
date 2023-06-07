// import { GameContext } from '../../context/game-context';
import * as React from 'react';
import { MdOutlineBackspace } from 'react-icons/md';
import { GameContext } from '../../provider/GameProvider';
import Key from './Key';

interface KeyboardProps {
  onAddChar: (letter: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onAddChar, onEnter, onDelete }) => {
  const { keyStatus } = React.useContext(GameContext);

  const onClick = (value: string) => {
    if (value === 'Enter') onEnter();
    else if (value === 'Backspace') onDelete();
    else {
      const key = value.toUpperCase();
      if (key.length === 1 && key >= 'A' && key <= 'Z') onAddChar(key);
    }
  };

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') onEnter();
      else if (e.code === 'Backspace') onDelete();
      else {
        const key = e.key.toUpperCase();
        if (key.length === 1 && key >= 'A' && key <= 'Z') onAddChar(key);
      }
    };

    window.addEventListener('keyup', listener);

    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onEnter, onDelete, onAddChar]);

  return (
    <div className="keyboard mx-2 select-none">
      <div className="mx-auto mb-2 flex w-full">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} className="fade flex-1" />;
        })}
      </div>
      <div className="mx-auto mb-2 flex w-full">
        <Key className="half flex-[0.5]" />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} className="flex-1" />;
        })}
        <Key className="half flex-[0.5]" />
      </div>
      <div className="mx-auto mb-2 flex w-full">
        <Key letter={'Enter'} onClick={onClick} className="one-and-a-half flex-[1.5] text-xs" />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} className="flex-1" />;
        })}
        <Key
          letter={'Backspace'}
          icon={<MdOutlineBackspace size="1.5rem" />}
          onClick={onClick}
          className="one-and-a-half flex-[1.5] text-xs"
        />
      </div>
    </div>
  );
};

export default Keyboard;
