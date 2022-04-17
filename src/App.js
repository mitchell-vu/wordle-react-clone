import { useState } from 'react';
import { Game } from './components/Game/Game';
import { Header } from './components/Header/Header';
import { Instructions } from './components/Instructions/Instructions';
import { FullScreenModals } from './components/Modals/Modals';

const mockData = [
  [
    {letter: 'a', state: 'correct'},
    {letter: 'e', state: 'present'},
    {letter: 'r', state: 'present'},
    {letter: 'o', state: 'absent'},
    {letter: 's', state: 'absent'},
  ],
  [
    {letter: 'a', state: 'correct'},
    {letter: 'p', state: 'absent'},
    {letter: 'p', state: 'correct'},
    {letter: 'l', state: 'correct'},
    {letter: 'e', state: 'correct'},
  ],
  [
    {letter: 't', state: 'absent'},
    {letter: 'h', state: 'absent'},
    {letter: 'i', state: 'absent'},
    {letter: 'n', state: 'absent'},
    {letter: 'g', state: 'absent'},
  ],
  [],
  [],
  []
];



function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const toggleModal = () => {
    setShowModal((currState) => !currState);
  };

  return (
    <>
      <Header toggleModal={toggleModal} />
      <Game gameData={mockData}/>
      {showModal && (
        <FullScreenModals
          header='How to play'
          content={<Instructions />}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
}

export default App;
