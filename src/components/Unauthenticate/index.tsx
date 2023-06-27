import { type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Unauthenticate = (): ReactElement => {
  return (
    <main className="h-full p-12">
      <Outlet />
    </main>
  )
}

export default Unauthenticate
