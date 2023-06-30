import { type ReactElement } from 'react';

import Skeleton from '../../components/ui/Skeleton';

export default function AccountSkeleton(): ReactElement {
  return (
    <>
      <Skeleton className='h-6 w-28' />•
      <Skeleton className='h-6 w-28' />•
      <Skeleton className='h-6 w-28' />
    </>
  );
}
