import { type ReactElement, useMemo } from 'react';

import { type UsersFriends } from '../../../endpoints/friends/getUsersFriends';
import { getPersonastateString } from '../../../utils/user';
import DisplayFriend from '../DisplayFriend';

interface Props {
  title: string | ReactElement;
  friends: UsersFriends[];
  isChecked?: boolean;
}
export default function FriendCollapse({
  title,
  friends,
  isChecked,
}: Props): ReactElement {
  const friendsSortedByStatus = useMemo(() => {
    return friends.sort((a, b) => {
      if (a.gameid && !b.gameid) return -1;

      return a.personastate - b.personastate;
    });
  }, [friends]);

  return (
    <div className='relative'>
      <input
        type='checkbox'
        className='peer absolute inset-0 z-10 h-full max-h-10 w-full cursor-pointer opacity-0'
        defaultChecked={isChecked}
      />
      <div className='absolute left-1 top-[9px] flex h-5 w-5 items-center justify-center before:absolute before:h-[2px] before:w-[10px] before:bg-white before:content-[""] after:absolute after:h-[10px] after:w-[2px] after:bg-white after:transition-opacity after:duration-300 after:content-[""] peer-checked:after:opacity-0' />
      <div className='w-full justify-start rounded-2xl bg-gradient-to-r from-[#161616] to-[#2E2E2E] px-4 py-2 pl-6'>
        {title}
      </div>
      <div className='no-scrollbar mt-3 flex max-h-0 flex-col gap-3 overflow-y-scroll transition-all duration-300 ease-in-out peer-checked:max-h-52'>
        {friendsSortedByStatus.map((friend) => (
          <DisplayFriend
            key={friend.steamid}
            status={getPersonastateString(friend.personastate)}
            friend={friend}
          />
        ))}
      </div>
    </div>
  );
}
