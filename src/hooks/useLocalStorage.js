import { useCallback } from "react";
function useLocalStorage(key, fallback) {
  const get = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }, [fallback, key]);
  const set = useCallback(
    (value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );
  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);
  return { get, set, remove };
}
export {
  useLocalStorage
};
