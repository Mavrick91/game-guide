import { type ReactElement, useCallback } from 'react';

import { VideogameAsset } from '@mui/icons-material';

import Button from '../../components/Button';

function LogoAvatar(): ReactElement {
  return (
    <div className='w-1/2 border border-[#161616] flex items-center justify-center bg-[#161616] rounded-[48px]'>
      <img
        src='/images/ninja_avatar.png'
        alt='Ninja Avatar'
        width={400}
        height={400}
      />
    </div>
  );
}

function LogoText(): ReactElement {
  const handleClickSteam = useCallback(() => {
    window.location.href = 'http://localhost:4000/auth/steam';
  }, []);

  return (
    <div className='w-1/2 flex items-center justify-center text-white px-10'>
      <div className='w-[400px]'>
        <div className='flex flex-col items-start gap-14'>
          <div className='flex items-center gap-4'>
            <div className='py-1 px-3 bg-black rounded-xl flex items-center'>
              <VideogameAsset fontSize='small' />
            </div>
            <span className='text-xl font-poppins font-medium'>Game Guide</span>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-5xl font-poppins font-medium'>DISCOVER</div>
            <div className='text-lg font-poppins'>
              Find out what games you should play, read reviews & connect with
              other gamers.
            </div>
          </div>

          <Button onClick={handleClickSteam} variant='black' size='medium'>
            Start searching
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Login(): ReactElement {
  return (
    <div className='border-[#030303] rounded-[48px] w-full bg-[#2E2E2E] flex h-full p-[1px]'>
      <LogoText /> <LogoAvatar />
    </div>
  );
}
