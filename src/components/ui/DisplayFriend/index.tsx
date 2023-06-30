import { type ReactElement, useMemo } from 'react';

import moment from 'moment';

import { type UsersFriends } from '../../../endpoints/user/getUsersFriends';
import { getPersonastateString, type PersonaState } from '../../../utils/user';

interface Props {
  status: PersonaState;
  friend: UsersFriends;
}
const DisplayFriend = ({ friend, status }: Props): ReactElement => {
  const isOffline = status === 'Offline';
  const isAway = status === 'Away';

  const opacityClass = useMemo(() => (isAway ? 'opacity-50' : ''), [isAway]);

  const avatarBrightness = isOffline ? 'brightness-50' : '';
  const textClass = isOffline
    ? 'text-slate-300 opacity-50'
    : 'text-moonstone-pop';
  const subTextClass = isOffline
    ? 'text-slate-300 opacity-50'
    : 'text-moonstone';

  const statusText = isOffline
    ? moment(friend.lastlogoff * 1000).fromNow()
    : getPersonastateString(friend.personastate);

  return (
    <div className={`flex flex-col gap-5 ${opacityClass}`}>
      <div className='flex items-center gap-2'>
        <img
          src={friend.avatar}
          alt='Avatar'
          className={`h-8 w-8 ${avatarBrightness}`}
        />
        <div className='flex flex-col text-[#58A4B0]'>
          <span className={`text-sm ${textClass}`}>{friend.personaname}</span>
          <span className={`text-xs text-moonstone ${subTextClass}`}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DisplayFriend;
