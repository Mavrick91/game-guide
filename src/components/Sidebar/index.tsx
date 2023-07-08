import { type ReactElement } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';

import { useUser } from '../../context/UserProvider';
import useLogout from '../../endpoints/user/useLogout';
import Button from '../ui/Button';
import CustomNavLink from '../ui/CustomNavLink';

export default function Sidebar(): ReactElement {
  const user = useUser();
  const logout = useLogout();

  return (
    <div className='flex h-full w-56 flex-col gap-9 bg-[#2E2E2E] px-3 py-8'>
      <div className='-mx-2 mt-6 flex flex-col items-center'>
        <img
          src={user.avatarfull}
          alt='avatar'
          className='h-20 w-20 rounded-full'
        />
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='font-bold text-white'>
          <CustomNavLink to='/'>
            <LibraryBooksIcon />
            <span>My Library</span>
          </CustomNavLink>
        </div>
        <div className='space-y-1'>
          <CustomNavLink to='/account' variant='ghost'>
            <AccountCircleIcon />
            <span>Account</span>
          </CustomNavLink>
          <Button onClick={logout} className='px-6 py-3 font-medium'>
            <LogoutIcon />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
