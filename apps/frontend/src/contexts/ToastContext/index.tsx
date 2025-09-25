import { Toast } from '@io-cdc/ui';
import { createContext, useContext, useState, ReactNode } from 'react';

type MessageType = 'success' | 'error';

type Toast = {
  id: string;
  message: string;
  messageType: MessageType;
  onOpen?: () => void;
  onClose?: () => void;
};

type ToastContextType = {
  showToast: (toast: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [open, setOpen] = useState(false);
  const showToast = ({ message, messageType, onOpen, onClose }: Omit<Toast, 'id'>) => {
    const id = String(Date.now() + Math.random());
    const newToast: Toast = { id, message, messageType, onOpen, onClose };

    setToast(newToast);
    setOpen(true);

    newToast.onOpen?.();

    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
      newToast.onClose?.();
    }, 3000);
  };

  const handleExited = () => {
    toast?.onClose?.();
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        {...toast}
        open={open}
        onClose={() => setOpen(false)}
        TransitionProps={{ onExited: handleExited }}
      />
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
