import App from '@/app/App.tsx';
import AppProvider from '@/provider/AppProvider.tsx';
import GameProvider from '@/provider/GameProvider.tsx';
import '@/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AppProvider>
  </React.StrictMode>,
);
