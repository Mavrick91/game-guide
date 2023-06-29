import React, { type ReactElement } from 'react';

import { type Router as RemixRouter } from '@remix-run/router/dist/router';
import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Authenticate, {
  loader as authenticateLoader,
} from './components/Authenticate';
import Unauthenticate, {
  loader as unauthenticateLoader,
} from './components/Unauthenticate';
import UserProvider from './context/UserProvider';
import Account, { loader as accountLoader } from './screens/Account';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import { action as logoutAction } from './screens/Logout';
import NotFound from './screens/NotFound';

const router = (queryClient: QueryClient): RemixRouter =>
  createBrowserRouter([
    {
      path: '/login',
      element: <Unauthenticate />,
      loader: unauthenticateLoader(queryClient),
      errorElement: <NotFound />,
      children: [{ index: true, element: <Login /> }],
    },
    {
      path: '/',
      loader: authenticateLoader(queryClient),
      element: (
        <UserProvider>
          <Authenticate />
        </UserProvider>
      ),
      errorElement: <NotFound />,
      children: [
        { path: '/', element: <Dashboard /> },
        {
          path: '/account',
          element: <Account />,
          loader: accountLoader(queryClient),
        },
        {
          path: '/logout',
          action: logoutAction,
        },
      ],
    },
  ]);

export default function App(): ReactElement {
  const queryClient = useQueryClient();

  return <RouterProvider router={router(queryClient)} />;
}
