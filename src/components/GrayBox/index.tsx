import { type ReactElement, type ReactNode } from 'react';

export default function GrayBox({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <div className='rounded-xl bg-[#2E2E2E] p-6'>{children}</div>;
}
