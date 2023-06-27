import { type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

export default function Authenticate(): ReactElement {
  return (
    <main className='h-full'>
      <Outlet />
    </main>
  )
}
