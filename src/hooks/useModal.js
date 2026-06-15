import { useCallback, useState } from "react";
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const open = useCallback((nextPayload) => {
    setPayload(nextPayload ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setPayload(null);
  }, []);
  return { isOpen, payload, open, close };
}
export {
  useModal
};
