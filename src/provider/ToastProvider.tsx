import { ALERT_TIME_MS } from '@/constants/settings';
import ToastContext, { ShowOptions } from '@/contexts/ToastProvider';
import { ReactNode, useCallback, useContext, useState } from 'react';

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
