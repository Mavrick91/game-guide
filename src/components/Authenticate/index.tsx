import { type ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';

export default function Authenticate(): ReactElement {
  return (
    <main className='flex h-full'>
      <Sidebar />

      <div className='w-ful p-10'>
        <Outlet />
      </div>
    </main>
  );
}
