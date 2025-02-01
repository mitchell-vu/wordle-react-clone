import { createContext } from 'react';

export interface ShowOptions {
  persist?: boolean;
  delayMs?: number;
  durationMs?: number;
  onClose?: () => void;
}

interface ToastContextValue {
  message: string | null;
  isVisible: boolean;
  addToast: (message: string, options?: ShowOptions) => void;
}

const ToastContext = createContext<ToastContextValue>({
  message: null,
  isVisible: false,
  addToast: () => null,
});

export default ToastContext;
