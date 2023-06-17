import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { ALERT_TIME_MS } from '../constants/settings';

type ShowOptions = {
  persist?: boolean;
  delayMs?: number;
  durationMs?: number;
  onClose?: () => void;
};

interface ToastContextValue {
  message: string | null;
  isVisible: boolean;
  addToast: (message: string, options?: ShowOptions) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  message: null,
  isVisible: false,
  addToast: () => null,
});

ToastContext.displayName = 'ToastContext';

type ToastProviderProps = {
  children?: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const addToast = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      const { delayMs = 0, persist, onClose, durationMs = ALERT_TIME_MS } = options || {};

      setTimeout(() => {
        setMessage(newMessage);
        setIsVisible(true);

        if (!persist) {
          setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
              onClose();
            }
          }, durationMs);
        }
      }, delayMs);
    },
    [setMessage, setIsVisible],
  );

  return <ToastContext.Provider value={{ message, isVisible, addToast }}>{children}</ToastContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
