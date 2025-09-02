import { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '../../components/Toast';

type Toast = {
  id: number;
  message: string;
  messageType: 'success' | 'error';
  onOpen?: () => void;
  onClose?: () => void;
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = ({ message, messageType, onOpen, onClose }: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    const newToast: Toast = { id, message, messageType, onOpen, onClose };

    setToasts((prev) => [...prev, newToast]);

    newToast.onOpen?.();

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      newToast.onClose?.();
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(({ id, ...toast }) => (
        <Toast {...toast} open={true} key={id} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve essere usato dentro un ToastProvider');
  }
  return context;
};
