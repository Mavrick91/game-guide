import { type ReactElement, useCallback, useMemo } from 'react';

import { type UsersFriends } from '../../endpoints/user/getUsersFriends';
import FriendCollapse from '../ui/FriendCollapse';
import GrayBox from '../ui/GrayBox';

interface Props {
  friends: UsersFriends[];
}
export default function FriendsList({ friends }: Props): ReactElement {
  const friendsOnline = useMemo(() => {
    return friends.filter((friend) => friend.personastate > 0);
  }, [friends]);

  const friendsOffline = useMemo(() => {
    return friends.filter((friend) => friend.personastate === 0);
  }, [friends]);

  const titleWithCount = useCallback((title: string, total: number) => {
    return (
      <span>
        {title} <span className='text-sm text-gray-500'>({total})</span>
      </span>
    );
  }, []);

  return (
    <GrayBox className='flex h-full w-[356px] flex-col gap-5'>
      <h2 className='text-xl'>Friends</h2>

      <div className='flex flex-col gap-3'>
        <FriendCollapse
          title={titleWithCount('Online', friendsOnline.length)}
          friends={friendsOnline}
          defaultOpen
        />
        <FriendCollapse
          title={titleWithCount('Offline', friendsOffline.length)}
          friends={friendsOffline}
        />
      </div>
    </GrayBox>
  );
}
