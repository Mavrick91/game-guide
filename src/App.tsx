import React, { type ReactElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authenticate from './components/Authenticate'
import Unauthenticate from './components/Unauthenticate'
import { useUser } from './context/UserProvider'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import NotFound from './screens/NotFound'

const UnauthenticateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Unauthenticate />,
    errorElement: <NotFound />,
    children: [{ path: '/', element: <Login /> }]
  }
])

const AuthenticateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Authenticate />,
    errorElement: <NotFound />,
    children: [{ path: '/', element: <Dashboard /> }]
  }
])

export default function App (): ReactElement {
  const user = useUser()
  console.log('🚀 ~ user', typeof user)

  return <RouterProvider router={user === null ? UnauthenticateRouter : AuthenticateRouter} />
}
