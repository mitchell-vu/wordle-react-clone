import { useState } from 'react';
import { Game } from './components/Game/Game';
import { Header } from './components/Header/Header';
import { Instructions } from './components/Instructions/Instructions';
import { FullScreenModals } from './components/Modals/Modals';
import { GameProvider } from './context/game-context';

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((currState) => !currState);
  };

  return (
    <GameProvider>
      <Header toggleModal={toggleModal} />
      <Game />
      {showModal && (
        <FullScreenModals
          header='How to play'
          content={<Instructions />}
          toggleModal={toggleModal}
        />
      )}
    </GameProvider>
  );
}

export default App;
