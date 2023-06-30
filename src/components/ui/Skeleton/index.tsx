import { type HTMLAttributes, type ReactElement } from 'react';

import { cn } from '../../../utils/style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function Skeleton({ className, ...props }: Props): ReactElement {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white dark:bg-neutral-800',
        className
      )}
      {...props}
    />
  );
}
