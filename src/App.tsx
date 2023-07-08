import React, { type ReactElement } from 'react';

import { type Router as RemixRouter } from '@remix-run/router/dist/router';
import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Authenticate, {
  loader as authenticateLoader,
} from './components/Authenticate';
import Unauthenticate from './components/Unauthenticate';
import useIsAuthenticated from './endpoints/user/useIsAuthenticated';
import Account, { loader as accountLoader } from './screens/Account';
import Dashboard, { loader as dashboardLoader } from './screens/Dashboard';
import GameDetails, {
  loader as gameDetailsLoader,
} from './screens/GameDetails';
import Login from './screens/Login';
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
      loader: authenticateLoader(queryClient),
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: dashboardLoader(queryClient),
        },
        {
          path: '/account',
          element: <Account />,
          loader: accountLoader(queryClient),
        },
        {
          path: '/games/:gameId',
          element: <GameDetails />,
          loader: gameDetailsLoader(queryClient),
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
