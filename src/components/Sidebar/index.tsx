import LogoutIcon from '@mui/icons-material/Logout'
import { type ReactElement } from 'react'
import { useUser } from '../../context/UserProvider'
import useLogout from '../../endpoints/user/useLogout'
import Button from '../Button'

export default function Sidebar(): ReactElement {
  const user = useUser()
  const { mutate } = useLogout()

  return (
    <div className='flex flex-col w-48 h-full bg-[#2E2E2E] px-6 py-8 justify-between'>
      <div className='flex flex-col items-center mt-6 -mx-2'>
        <img
          src={user?.avatarfull}
          alt='avatar'
          className='w-20 h-20 rounded-full'
        />
      </div>
      <div>
        <Button className='font-medium' onClick={mutate}>
          <div className='flex gap-3'>
            <LogoutIcon />
            <span>Log out</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
