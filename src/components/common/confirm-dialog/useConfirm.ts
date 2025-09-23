// hooks/useConfirm.ts
import { useCallback, useState } from 'react';

interface UseConfirmReturn {
  confirm: (message?: string) => Promise<boolean>;
  isOpen: boolean;
  message: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export function useConfirm(): UseConfirmReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [resolveCallback, setResolveCallback] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = useCallback(
    (confirmMessage: string = '実行しますか？'): Promise<boolean> => {
      setMessage(confirmMessage);
      setIsOpen(true);
      return new Promise<boolean>(resolve => {
        setResolveCallback(() => resolve);
      });
    },
    [],
  );

  const handleConfirm = useCallback((): void => {
    if (resolveCallback) {
      resolveCallback(true);
    }
    setIsOpen(false);
    setResolveCallback(null);
    setMessage('');
  }, [resolveCallback]);

  const handleCancel = useCallback((): void => {
    if (resolveCallback) {
      resolveCallback(false);
    }
    setIsOpen(false);
    setResolveCallback(null);
    setMessage('');
  }, [resolveCallback]);

  return {
    confirm,
    isOpen,
    message,
    handleConfirm,
    handleCancel,
  };
}
