import React, { type ReactElement } from 'react';

import { type Router as RemixRouter } from '@remix-run/router/dist/router';
import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Authenticate from './components/Authenticate';
import Unauthenticate from './components/Unauthenticate';
import useIsAuthenticated from './endpoints/user/useIsAuthenticated';
import Account, { loader as accountLoader } from './screens/Account';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import { action as logoutAction } from './screens/Logout';
import NotFound from './screens/NotFound';

const UnauthenticateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Unauthenticate />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Login /> }],
  },
]);

const AuthenticateRouter = (queryClient: QueryClient): RemixRouter =>
  createBrowserRouter([
    {
      path: '/',
      element: <Authenticate />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: '/account',
          element: <Account />,
          loader: accountLoader(queryClient),
        },
        {
          path: '/logout',
          action: logoutAction(queryClient),
        },
      ],
    },
  ]);

export default function App(): ReactElement {
  const queryClient = useQueryClient();
  const { data: isAuthenticate, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <div />;
  }

  return (
    <RouterProvider
      router={
        isAuthenticate === true
          ? AuthenticateRouter(queryClient)
          : UnauthenticateRouter
      }
    />
  );
}
