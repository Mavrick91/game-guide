import { type ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import UserProvider from '../../context/UserProvider';
import Sidebar from '../Sidebar';

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
