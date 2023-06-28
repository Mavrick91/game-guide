import { type ReactElement } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/UserProvider';
import useLogout from '../../endpoints/user/useLogout';
import Button from '../Button';

export default function Sidebar(): ReactElement {
  const user = useUser();
  const { mutate } = useLogout();

  return (
    <div className='flex h-full w-48 flex-col justify-between bg-[#2E2E2E] px-6 py-8'>
      <div className='-mx-2 mt-6 flex flex-col items-center'>
        <img
          src={user.avatarfull}
          alt='avatar'
          className='h-20 w-20 rounded-full'
        />
        <span className='mt-2 font-medium text-white'>{user.personaname}</span>
      </div>
      <div className='space-y-5'>
        <Button className='font-medium'>
          <Link to='/account'>
            <div className='flex gap-3'>
              <AccountCircleIcon />
              <span>Account</span>
            </div>
          </Link>
        </Button>
        <Button className='font-medium' onClick={mutate}>
          <div className='flex gap-3'>
            <LogoutIcon />
            <span>Log out</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
