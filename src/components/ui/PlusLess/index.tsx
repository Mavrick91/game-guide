import { type ReactElement } from 'react';

interface Props {
  isActive: boolean;
}
export default function PlusLess({ isActive }: Props): ReactElement {
  return (
    <div
      className={`relative flex h-5 w-5 items-center justify-center before:absolute before:h-[2px] before:w-[10px] before:bg-white before:content-[""] after:absolute after:h-[10px] after:w-[2px] after:bg-white after:transition-all after:duration-300 after:content-[""] ${
        isActive ? 'after:opacity-0' : 'after:opacity-100'
      }`}
    />
  );
}
