import { type ReactElement, Suspense } from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { type QueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';

import AccountSkeleton from './AccountSkeleton';
import Divider from '../../components/Divider';
import FlagDisplay from '../../components/FlagDisplay';
import GrayBox from '../../components/GrayBox';
import { useUser } from '../../context/UserProvider';
import getLocation from '../../endpoints/user/getLocation';
import { getProfileVisibility } from '../../utils/user';

const AccountInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): ReactElement => (
  <div className='flex'>
    <div className='w-40 font-bold'>{label}:</div>
    <div className='font-extralight'>
      {label === 'Profile URL' ? (
        <div className='flex items-center gap-3'>
          <Link
            to={value}
            target='_blank'
            rel='noopener noreferrer'
            className='text-purple underline'
          >
            View Profile
          </Link>
          <OpenInNewIcon fontSize='small' />
        </div>
      ) : (
        value
      )}
    </div>
  </div>
);

export function loader(queryClient: QueryClient) {
  return async () => {
    const location = queryClient.ensureQueryData(getLocation());

    return defer({ data: location });
  };
}

export default function Account(): ReactElement {
  const user = useUser();
  const { data } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <div className='flex flex-col gap-5 text-white'>
      <div>
        <h1 className='text-xl font-bold'>Account</h1>
        <Divider />
        <GrayBox>
          <div className='flex flex-col gap-3'>
            <AccountInfo
              label='Visibility'
              value={getProfileVisibility(user.communityvisibilitystate)}
            />
            <AccountInfo label='Name' value={user.personaname} />
            <AccountInfo label='Profile URL' value={user.profileurl} />
            <AccountInfo label='Primary Clan ID' value={user.primaryclanid} />
            <AccountInfo label='Steam ID' value={user.steamid} />
          </div>
        </GrayBox>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Activity</h1>
        <Divider />
        <GrayBox>
          <div className='flex flex-col gap-3'>
            <AccountInfo
              label='Last connection'
              value={moment(user.lastlogoff * 1000).format('MMMM Do YYYY')}
            />
            <AccountInfo
              label='Account created'
              value={moment(user.timecreated * 1000).format('MMMM Do YYYY')}
            />
          </div>
        </GrayBox>
      </div>
      <div>
        <h1 className='text-xl font-bold'>Location</h1>
        <Divider />
        <div className='flex items-center gap-3'>
          <Suspense fallback={<AccountSkeleton />}>
            <Await resolve={data}>
              {(location) => (
                <>
                  <div>{location.countryName}</div>
                  <FlagDisplay countryCode={location.country} />•
                  <div>{location.region}</div>•<div>{location.city}</div>
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
