import { type ReactElement, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}
export default function GrayBox({
  children,
  className = '',
}: Props): ReactElement {
  return (
    <div
      className={`rounded-xl bg-[#2E2E2E] p-6 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
