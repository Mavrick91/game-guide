import { type FC } from 'react';

import { useRouteError } from 'react-router-dom';

interface Error {
  statusText?: string;
  message?: string;
}

const NotFound: FC = () => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className='h-full flex flex-col items-center justify-center text-white gap-8'>
      <h1 className='text-7xl'>Oops!</h1>
      <p className='text-4xl'>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText != null || error.message}</i>
      </p>
    </div>
  );
};

export default NotFound;
