import { type MutableRefObject, useEffect } from 'react';

export default function useClickOutside(
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: () => void
): void {
  const handleClick = (e: MouseEvent): void => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
