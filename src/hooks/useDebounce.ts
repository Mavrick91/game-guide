import { useEffect, useRef, useCallback } from 'react';

// eslint-disable-next-line
const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  // Using `any` rather than `NodeJS.Timeout` for wider platform compatibility (browsers and Node.js)
  // eslint-disable-next-line
  const callbackRef = useRef<any>(null);
  const latestCallback = useRef(callback);

  // Update the latest callback if it changes
  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>): void => {
      // If a timer was already started, clear it
      if (callbackRef.current) {
        clearTimeout(callbackRef.current);
      }

      // Start a new timer
      callbackRef.current = setTimeout(() => {
        latestCallback.current(...args);
      }, delay);
    },
    [delay]
  ) as T;
};

export default useDebounce;
