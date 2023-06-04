// import { GameContext } from '../../context/game-context';
import * as React from 'react';
import { MdOutlineBackspace } from 'react-icons/md';
import { GameContext } from '../../provider/GameProvider';
import Key from './Key';
import './Keyboard.sass';

interface KeyboardProps {
  onAddChar: (letter: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onAddChar, onEnter, onDelete }) => {
  const { keyStatus } = React.useContext(GameContext);

  const onClick = (value: string) => {
    if (value === 'Enter') {
      onEnter();
    } else if (value === 'Backspace') {
      onDelete();
    } else {
      const key = value.toUpperCase();

      if (key.length === 1 && key >= 'A' && key <= 'Z') {
        onAddChar(key);
      }
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
    <div className="keyboard">
      <div className="keyboard__row">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} className="fade" />;
        })}
      </div>
      <div className="keyboard__row">
        <Key className="half" />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} />;
        })}
        <Key className="half" />
      </div>
      <div className="keyboard__row">
        <Key letter={'Enter'} onClick={onClick} className="one-and-a-half" />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key, index) => {
          return <Key key={index} letter={key} state={keyStatus[key]} onClick={onClick} />;
        })}
        <Key
          letter={'Backspace'}
          icon={<MdOutlineBackspace size="1.5rem" />}
          onClick={onClick}
          className="one-and-a-half"
        />
      </div>
    </div>
  );
};

export default Keyboard;
