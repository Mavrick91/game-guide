import { type ReactElement, useEffect } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';

import isAuthenticate from '../../endpoints/user/isAuthenticate';
import Sidebar from '../Sidebar';

export function loader(queryClient: QueryClient) {
  return async () => {
    return await queryClient.ensureQueryData(isAuthenticate());
  };
}

export default function Authenticate(): ReactElement {
  const isAuth = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (isAuth === false) {
    return <div />;
  }

  return (
    <main className='flex h-full w-full'>
      <Sidebar />

      <div className='grow p-10'>
        <Outlet />
      </div>
    </main>
  );
}
