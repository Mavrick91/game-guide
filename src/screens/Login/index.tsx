import { type ReactElement, useCallback } from 'react';

import { VideogameAsset } from '@mui/icons-material';

import Button from '../../components/ui/Button';

function LogoAvatar(): ReactElement {
  return (
    <div className='flex w-1/2 items-center justify-center rounded-[48px] border border-[#161616] bg-[#161616]'>
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
    <div className='flex w-1/2 items-center justify-center px-10 text-white'>
      <div className='w-[400px]'>
        <div className='flex flex-col items-start gap-14'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center rounded-xl bg-black px-3 py-1'>
              <VideogameAsset fontSize='small' />
            </div>
            <span className='text-xl font-medium'>Game Guide</span>
          </div>

          <div className='flex flex-col gap-5'>
            <div className='text-5xl font-medium'>DISCOVER</div>
            <div className='text-lg'>
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
    <div className='flex h-full w-full rounded-[48px] border-[#030303] bg-[#2E2E2E] p-[1px]'>
      <LogoText /> <LogoAvatar />
    </div>
  );
}
