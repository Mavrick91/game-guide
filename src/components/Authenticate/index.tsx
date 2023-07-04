import { type ReactElement } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import UserProvider from '../../context/UserProvider';
import getAllGames from '../../endpoints/games/getAllGames';
import Sidebar from '../Sidebar';

export function loader(queryClient: QueryClient) {
  return async () => {
    await queryClient.ensureQueryData(getAllGames());

    return null;
  };
}

export default function Authenticate(): ReactElement {
  return (
    <main className='flex h-full w-full'>
      <UserProvider>
        <Sidebar />

        <div className='grow p-10'>
          <Outlet />
        </div>
      </UserProvider>
    </main>
  );
}
