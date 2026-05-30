import { useCallback, useState } from 'react';

export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);

  const open = useCallback((nextPayload?: T) => {
    setPayload(nextPayload ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPayload(null);
  }, []);

  return { isOpen, payload, open, close };
}