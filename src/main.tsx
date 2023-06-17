import App from '@/app/App.tsx';
import AppProvider from '@/provider/AppProvider.tsx';
import GameProvider from '@/provider/GameProvider.tsx';
import '@/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './provider/ToastProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ToastProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>,
);
