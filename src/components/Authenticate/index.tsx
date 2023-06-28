import { type ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';

export default function Authenticate(): ReactElement {
  return (
    <main className='h-full flex'>
      <Sidebar />

      <div className='p-10'>
        <Outlet />
      </div>
    </main>
  );
}
