import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import GameProvider from './provider/GameProvider.tsx';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
);
