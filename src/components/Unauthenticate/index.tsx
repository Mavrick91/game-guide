import { type ReactElement, useEffect } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import isAuthenticate from '../../endpoints/user/isAuthenticate';

export function loader(queryClient: QueryClient) {
  return async () => {
    return await queryClient.ensureQueryData(isAuthenticate());
  };
}

export default function Unauthenticate(): ReactElement {
  const isAuth = useLoaderData();
  console.log('🚀 ~ isAuth', isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === true) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (isAuth === true) {
    return <div />;
  }

  return (
    <main className='h-full p-12 '>
      <Outlet />
    </main>
  );
}
