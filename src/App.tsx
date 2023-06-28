import React, { type ReactElement } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

import Authenticate from './components/Authenticate';
import Unauthenticate from './components/Unauthenticate';
import UserProvider from './context/UserProvider';
import useIsAuthenticate from './endpoints/user/useIsAuthenticate';
import Account from './screens/Account';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import NotFound from './screens/NotFound';

const UnauthenticateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Unauthenticate />,
    errorElement: <NotFound />,
    children: [{ path: '/', element: <Login /> }],
  },
]);

const AuthenticateRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <Authenticate />
      </UserProvider>
    ),
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/account', element: <Account /> },
    ],
  },
]);

export default function App(): ReactElement {
  const { data: isAuthenticate, isLoading } = useIsAuthenticate();

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <RingLoader color='#7865AE' size={200} />
      </div>
    );
  }

  return (
    <RouterProvider
      router={
        isAuthenticate === true ? AuthenticateRouter : UnauthenticateRouter
      }
    />
  );
}
